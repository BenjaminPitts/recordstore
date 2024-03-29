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

//index
router.get('/recordstore', (req, res)=>{
  Item.find({}, (err, data)=>{
    res.render('index.ejs',
      {
        item: data,
        tabTitle: 'Home',
        currentUser: req.session.currentUser
      })
  })
})

//metal route
router.get('/recordstore/metal', (req, res)=>{
  Item.find({ genre: 'metal' }, (err, data)=>{
    res.render('genres/metal.ejs',
      {
        item: data,
        tabTitle: 'Metal',
        currentUser: req.session.currentUser
      })
  })
})
//punk route
router.get('/recordstore/punk', (req, res)=>{
  Item.find({ genre:'punk' }, (err, data)=>{
    res.render('genres/punk.ejs',
      {
        item: data,
        tabTitle: 'Punk',
        currentUser: req.session.currentUser
      })
  })
})
//hardcore route
router.get('/recordstore/hardcore', (req, res)=>{
  Item.find({ genre:'hardcore' }, (err, data)=>{
    res.render('genres/hardcore.ejs',
      {
        item: data,
        tabTitle: 'Hardcore',
        currentUser: req.session.currentUser
      })
  })
})
//hip-hop route
router.get('/recordstore/hiphop', (req, res)=>{
  Item.find({ genre:'hiphop' }, (err, data)=>{
    res.render('genres/hiphop.ejs',
      {
        item: data,
        tabTitle: 'Hip Hop',
        currentUser: req.session.currentUser
      })
  })
})
//classic route
router.get('/recordstore/classic', (req, res)=>{
  Item.find({ genre:'classic' }, (err, data)=>{
    res.render('genres/classic.ejs',
      {
        item: data,
        tabTitle: 'Classic',
        currentUser: req.session.currentUser
      })
  })
})

//other route
router.get('/recordstore/other', (req, res)=>{
  Item.find({ genre:'other' }, (err, data)=>{
    res.render('genres/other.ejs',
      {
        item: data,
        tabTitle: 'Other',
        currentUser: req.session.currentUser
      })
  })
})

//new page route
router.get('/recordstore/new', isAuthenticated, (req, res)=>{
  Item.find({}, (err, data)=>{
    res.render('new.ejs',
    {
    item: data,
    tabTitle: 'Post New',
    currentUser: req.session.currentUser
    })
    //console.log(data)
  })
})

//show page route
router.get('/recordstore/:id', isAuthenticated, (req, res)=>{
  Item.findById(req.params.id, (err, data)=>{
    res.render(
      'show.ejs',
      {
        item: data,
        tabTitle: (data.band + ': ' + data.album),
        currentUser: req.session.currentUser
      })
  })
})

//edit page route
router.get('/recordstore/:id/edit', (req, res)=>{
  Item.findById(req.params.id, (err, data)=>{
    res.render(
      'edit.ejs',
      {
        item: data,
        tabTitle: ('Edit: ' + data.band + '-' + data.album),
        currentUser: req.session.currentUser
      }
    )
  })
})

//create route
router.post('/recordstore/', isAuthenticated, (req, res)=>{
  Item.create(req.body, (err, data)=>{
    res.redirect('/recordstore/')
  })
})

// put route
router.put('/recordstore/:id', (req, res)=>{
  Item.findByIdAndUpdate(req.params.id, req.body, (err, data)=>{
    res.redirect('/recordstore')
  })
})

//delete route
router.delete('/recordstore/:id', (req, res)=>{
  Item.findByIdAndRemove(req.params.id, (err, data)=>{
    res.redirect('/recordstore')
  })
})


//search route--unable to get this working
// router.get("/recordstore/search", function(req, res) {
//     if (req.query.search) {
//        const regex = new RegExp(escapeRegex(req.query.search), 'gi')
//        Item.find({ 'band': regex }, function(err, data) {
//            if(err) {
//                console.log(err)
//            } else {
//               res.render('search.ejs', { item: data })
//            }
//        })
//     }
// })
// function escapeRegex(text) {
//     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
// };


module.exports = router
