const express = require('express')
const app = express()
const port = 3000
const db = require('./models/db')

app.get('/', (req, res) => {
  res.send(db)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
