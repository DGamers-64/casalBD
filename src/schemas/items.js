const { Schema, model } = require('mongoose');
const itemSchema = new Schema({
    itemId: Number,
    image1: String,
    image2: String,
    image3: String
});

module.exports = new model("Items", itemSchema, "items");