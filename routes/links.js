const express = require('express');
const router = express.Router();

const pool = require('../database')

const {isLoggerIn} = require('../lib/auth')


/* GET users listing. */
router.get('/', isLoggerIn, async (req, res, next) => {
  const [ links ] = await pool.query('SELECT * FROM links WHERE user_id = ?',[req.user.id])
  console.log(links)
  res.render('links/list', { links })
  
});

router.get('/add',isLoggerIn, (req, res) => {
  res.render('links/add')
})

router.post('/add',isLoggerIn, async (req, res) => {
  const { title, url, descripcion } = req.body
  const newLink = {
    title,
    url,
    descripcion,
    user_id: req.user.id
  }

  // console.log(newLink)
  await pool.query('INSERT INTO links SET ?', [newLink])
  req.flash('success', 'Ruta añadida')
  res.redirect('/links')
})

router.get('/delete/:id',isLoggerIn, async (req, res) => {
  // console.log(req.params.id)
  const { id } = req.params
  await pool.query('DELETE FROM links WHERE id = ?', [ id ])
  req.flash('success', 'Ruta eliminada')

  res.redirect('/links')
})

router.get('/edit/:id',isLoggerIn, async (req, res) => {
  // console.log(req.params.id)
  const { id } = req.params
  const [ link ] = await pool.query('SELECT * FROM links WHERE id = ?', [ id ])

  console.log(link)
  // pasamos el  link al edir.hbs
  res.render('links/edit', { link:link[0]})
})

router.post('/edit/:id',isLoggerIn, async (req, res) => {
  const { id } = req.params
  const { title, url, descripcion } = req.body
  const newLink = {
    title,
    url,
    descripcion
  }
  // console.log(newLink)
  await pool.query('UPDATE links SET ? WHERE id = ?',[newLink, id])
  req.flash('success', 'Ruta editada')

  res.redirect('/links')
})


module.exports = router;
