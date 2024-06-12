const mongoose = require('mongoose');
const { comedorSchema } = require('./schemas');

const comedorModel = mongoose.model('Comedor', comedorSchema);

module.exports = { comedorModel };