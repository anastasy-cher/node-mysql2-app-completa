const express = require('express');
const router = express.Router();

const pool = require('../database')


/* GET users listing. */
router.get('/', async (req, res, next) => {
  const [ links ] = await pool.query('SELECT * FROM links')
  console.log(links)
  res.render('links/list', { links })
  
});

router.get('/add', (req, res) => {
  res.render('links/add')
})

router.post('/add', async (req, res) => {
  const { title, url, descripcion } = req.body
  const newLink = {
    title,
    url,
    descripcion
  }

  // console.log(newLink)
  await pool.query('INSERT INTO links SET ?', [newLink])
  res.redirect('/links')
})

router.get('/delete/:id', async (req, res) => {
  // console.log(req.params.id)
  const { id } = req.params
  await pool.query('DELETE FROM links WHERE id = ?', [ id ])
  res.redirect('/links')
})

router.get('/edit/:id', async (req, res) => {
  // console.log(req.params.id)
  const { id } = req.params
  const [ link ] = await pool.query('SELECT * FROM links WHERE id = ?', [ id ])
  console.log(link)
  // pasamos el  link al edir.hbs
  res.render('links/edit', { link:link[0]})
})

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params
  const { title, url, descripcion } = req.body
  const newLink = {
    title,
    url,
    descripcion
  }
  // console.log(newLink)
  await pool.query('UPDATE links SET ? WHERE id = ?',[newLink, id])
  res.redirect('/links')
})


module.exports = router;
