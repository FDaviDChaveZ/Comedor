const mongoose = require('mongoose');
const comedorSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    codeDish: {
        type: String,
        required: true,
    },
    dishName: {
        type: String,
        required: true
    },
    dishDescription: {
        type: String,
        required: true
    },
    dishIngredients: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = { comedorSchema }