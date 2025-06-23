const express = require('express')
const Todo = require('./models')
const path = require('path')
require('./db')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors({ origin: ['http://127.0.0.1:5500'] }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/dist')))
app.listen(PORT, () => {
  console.log(`good, http://localhost:${PORT}`)
})
app.post('/create', async (req, res) => {
  try {
    const { text, id } = req.body
    const todo = new Todo({ text, id })
    const saved = await todo.save()
    return res.json(saved)
  } catch (error) {
    console.error(`${error}, помилка при створенні`)
    res.status(500).json({ error: 'Помилка при створенні' })
  }
})

app.get('/getAll', async (req, res) => {
  try {
    const todos = await Todo.find()
    return res.json(todos)
  } catch (error) {
    console.error(`${error}, помилка при читанні`)
    res.status(500).json({ error: 'Помилка при читанні' })
  }
})
app.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updated = await Todo.updateOne({ id: Number(id) }, req.body)
    return res.json(updated)
  } catch (error) {
    console.error(`${error}, помилка при оновленні`)
    res.status(500).json({ error: 'Помилка при оновленні' })
  }
})
app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Todo.deleteOne({ id: Number(id) })
    return res.json(deleted)
  } catch (error) {
    console.error(`${error}, помилка при видаленні`)
    res.status(500).json({ error: 'Помилка при видаленні' })
  }
})
