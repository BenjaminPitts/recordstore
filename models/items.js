const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
band: { type: String, required: true },
album: { type: String },
genre: { type: String },
description: { type: String },
image: { type: String },
price: { type: Number, required: true, minimum: 0 },
seller: { type: String, required: true }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
