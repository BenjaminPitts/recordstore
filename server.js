//dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
const session = require('express-session')
require('dotenv').config()
//port for heroku
const PORT = process.env.PORT || 3003
//database connection via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI
//mongoose connection statement
mongoose.connect(MONGODB_URI,
  {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
//error-success messages
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

//controllers
const controller = require('./controllers/items.js')
app.use(controller)
const userController = require('./controllers/users.js')
app.use('/users', userController)
const sessionController = require('./controllers/sessions.js')
app.use('/sessions', sessionController)

//listening PORT
app.listen(PORT, ()=> console.log('Listening on port:', PORT))
