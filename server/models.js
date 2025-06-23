const { Schema, model } = require('mongoose')
const todoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  id: { type: Number, required: true, unique: true },
})
module.exports = model('Todo', todoSchema)
