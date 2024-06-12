const express = require("express")
const userService = require("./services/userService");
const uri = 'mongodb+srv://silvaiberson3:iberson123@cluster0.j8pegzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use(express.json())
const port = 8080
const { comedorModel } = require('./models');

app.get('/', (req, res) => { res.send("I am alive Comedor"); })

app.get('/comedor', async (req, res) => {
    const comedor = await comedorModel.find({});
    res.json(comedor);
});

app.post('/comedor', async (req, res) => {
    try {
        const { code, codeDish, dishName, dishDescription, dishIngredients } = req.body;

        // Verificar si el usuario existe
        
        console.log("Codigo entrante",code)
        let user = null;
        user = await userService.get(code);
        console.log("user entrante",user)
        if(!user) throw ("User not found");

        // Crear una nueva comida
        const newComedor = new comedorModel({
            code,
            codeDish,
            dishName,
            dishDescription,
            dishIngredients
        });

        // Guardar la nueva comida en la base de datos
        const savedComedor = await newComedor.save();

        res.status(201).json(savedComedor);
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/dishes/:codeDish', async (req, res) => {
    try {
        const { code, dishName, dishDescription, dishIngredients } = req.body;
        console.log("code", code)
        // Verificar si el usuario existe
        const user = await userService.get(code);
        console.log("user", user)
        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }

        const dish = await comedorModel.findOneAndUpdate({ codeDish: req.params.codeDish }); // Cambio de DishModel a comedorModel
        console.log("dish", dish)
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        // Actualizar el plato con los datos proporcionados
        dish.dishName = dishName || dish.dishName;
        dish.dishDescription = dishDescription || dish.dishDescription;
        dish.dishIngredients = dishIngredients || dish.dishIngredients;

        await dish.save();
        res.json(dish);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Comedor service running on port ${port}`);
});