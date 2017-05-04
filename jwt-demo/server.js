const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/login', (req, res) => {
  // check username password
  var token = jwt.sign({iss: 'LHL', userId: 232, iat: Date.now()}, 'my-secret')
  res.json({token})
})

app.get('/protected', (req, res) => {
  var token = req.headers.authorization.match(/^Bearer (.+)$/)[1];
  jwt.verify(token, 'my-secret', (err, decoded) => {
    if (err) {
      res.status(401).send('NOT AUTHORIZED')
    } else {
      res.send(`USER id: ${decoded.userId}`)
    }
  })
})
app.listen(5000)
