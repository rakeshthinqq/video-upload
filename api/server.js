import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import services from './services'

const API_PORT = Number(process.env.API_PORT) || 8000
// create express server
const app = express()
// enables cors
app.use(cors())
// enables bodyparser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// enables services
services.map(svc => app[svc.verb](svc.path, svc.callback))

app.listen(API_PORT, () => console
  .log("Started server on port : " + API_PORT)
)
