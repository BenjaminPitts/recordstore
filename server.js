//dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()
//port for heroku
const PORT = process.env.PORT || 3003
//database connection via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI
//mongoose connection statement
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false })
//error-success messages
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
//middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))
//routes
app.get('/', (req, res)=>{
  res.send('hello chef!')
})

//listening PORT
app.listen(PORT, ()=> console.log('Listening on port:', PORT))
