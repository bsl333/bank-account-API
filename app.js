const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const bankRoutes = require('./src/routes/bankAcct')

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/account', bankRoutes)

app.use((req, res, next) => {
  next({ status: 404, message: `Route ${req.url} not found` })
})

app.use((err, req, res, next) => {
  const error = {}
  error.status = err.status
  error.message = err.message

  res.status(error.status).json({ error })
})

app.listen(port, () => console.log(`On port ${port}`))
