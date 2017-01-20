const mysql = require('mysql')
const express = require('express')
const app = module.exports = express()

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 4
}

//create a connection pool
const pool = mysql.createPool(config)

pool.on('connection', connection => {
  console.log('new db connection')
})

pool.on('enqueue', () => {
  console.log('Waiting for available db connection slot')
})

//insert
app.post('/persons', (req, res) => {
  let values = [ req.body.firstname, req.body.lastname, req.body.age ]
  let sql = 'INSERT INTO person (firstname, lastname, age) VALUES(?, ?, ?)'
  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error(err)
      throw err
    }
    res.header('location', '/persons/' + result.insertId)
    res.status(201).send({
      id: result.insertId,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age
    })
  })
})

//read all
app.get('/persons', (req, res) => {
  let sql = 'SELECT * FROM person ORDER BY lastname, firstname'
  pool.query(sql, (err, rows, fields) => {
    if (err) {
      console.error(err)
      throw err
    }
    res.send(rows)
  })
})

//read one
app.get('/persons/:id', (req, res) => {
  let sql = 'SELECT * FROM person WHERE id = ?'
  pool.query(sql, [ req.params.id ], (err, rows, fields) => {
    if (err) {
      console.error(err)
      throw err
    }
    if (rows && rows.length > 0)
      res.send(rows[0])
    else
      res.status(404).send('person not found')
  })
})

//update
app.put('/persons/:id', (req, res) => {
  let sql = 'UPDATE person SET firstname = ?, lastname = ?, age = ? WHERE id = ?'
  let values = [ req.body.firstname, req.body.lastname, req.body.age, req.params.id ]
  pool.query(sql, values, (err, rows, fields) => {
    if (err) {
      console.error(err)
      throw err
    }
    res.send(req.body)
  })
})

//delete
app.delete('/persons/:id', (req, res) => {
  let sql = 'DELETE FROM person WHERE id = ?'
  pool.query(sql, [ req.params.id ], (err, rows, fields) => {
    if (err) {
      console.error(err)
      throw err
    }
    res.send()
  })
})
