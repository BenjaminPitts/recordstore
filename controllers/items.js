const express = require('express')
const router = express.Router()
const Item = require('../models/items.js')

const isAuthenticated = (req, res, next)=>{
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}
//root
router.get('/', (req, res)=>{
  res.redirect('/recordstore')
})

//index route
router.get('/recordstore', (req, res)=>{
  Item.find({}, (err, data)=>{
    res.render('index.ejs', {
      item: data
      // , tabTitle: 'Home Page',
      // currentUser: req.session.currentUser
    })
  })
})

//new route
router.get('/recordstore/new', (req, res)=>{
  res.render('new.ejs',
  // {
  //   tabTitle: 'New'
  // , currentUser: req.session.currentUser
  // }
  )
})

//show route
router.get('/recordstore/:id', (req, res)=>{
  Item.findById(req.params.id, (err, data)=>{
    res.render(
      'show.ejs',
      {
        item: data
        // , tabTitle: 'Item',
        // currentUser: req.session.currentUser
      })
    )
  }
})

//create route
router.post('/recordstore', (req, res)=>{
  Item.create(req.body, (err, data)=>{
    res.redirect('/recordstore')
  })
})

//delete route
router.delete('/recordstore/:id', (req, res)=>{
  Item.findByIdAndRemove(req.params.id, (err, data)=>{
    res.redirect('/recordstore')
  })
})

//edit and put routes
router.get('/recordstore/:id/edit', (req, res)=>{
  Item.findById(req.params.id, (err, data)=>{
    res.render(
      'edit.ejs',
      {
        item: data
        // , tabTitle: 'Edit',
        // currentUser: req.session.currentUser
      }
    )
  })
})
router.put('/recordstore/:id', (req, res)=>{
  Item.findByIdAndUpdate(req.params.id, req.body, (err, data)=>{
    res.redirect('/recordstore')
  })
})


module.exports = router
