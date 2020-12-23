const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res)=>{
  res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
})

//post new login and PW
sessions.post('/', (req, res)=>{
  User.findOne({username: req.body.username}, (err, foundUser)=>{
    if (err) {
      console.log(err)
      res.send('oops, there was a problem')
    } else if (!foundUser) {
      res.send('<a href="/recordstore">sorry, user not found</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/recordstore')
      } else {
        res.send('<a href="/recordstore">password did not match</a>')
      }
    }
  })
})

//quit sessions
sessions.delete('/', (req, res)=>{
  req.session.destroy(()=>{
    res.redirect('/recordstore')
  })
})





module.exports = sessions
