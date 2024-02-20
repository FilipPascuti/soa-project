import express from 'express'
import { ticketRoute } from './routes'
import bodyParser from 'body-parser'
import { globalErrorHandler } from './middlewares'
var cors = require('cors')

const app = express()

// app.options('*', cors());
// app.use(cors({credentials: true, origin: true}))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

app.use(ticketRoute)
app.use(globalErrorHandler)

module.exports = app
