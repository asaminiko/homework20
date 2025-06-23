const mongoose = require('mongoose')

const dbURL = 'mongodb://localhost:27017/db'

mongoose.connect(dbURL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'помилка підключення до mongoDB'))
db.once('open', () => {
  console.log('підключено')
})
module.exports = db
