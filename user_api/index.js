const express = require('express');
const uri = 'mongodb+srv://silvaiberson3:iberson123@cluster0.j8pegzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express();
app.use(express.json());
const port = 8080;
const { userModel } = require('./models');

app.get('/', (req, res) => { res.send("I am alive User Service"); });

// Endpoint para obtener todos los usuarios
app.get('/users', async (req, res) => {
    const users = await userModel.find({});
    res.json(users);
});

// Endpoint para verificar si un usuario existe
app.get('/users/:userId', async (req, res) => {
    const user = await userModel.findOne({ code: req.params.userId });
    if (!user) {
        return res.status(403).json({ message: 'User not found' });
    }
    res.json(user);
    
});

// Endpoint para crear un nuevo usuario
app.post('/users', async (req, res) => {
    try {
        const { code, name, lastname } = req.body;
        const newUser = new userModel({ code, name, lastname });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.listen(port, () => {
    console.log(`User service running on port ${port}`);
});
