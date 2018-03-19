import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import assert from 'assert'
import services from '../services'

// create express server
const app = express()
// enables cors
app.use(cors())
// enables bodyparser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Dummy service
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});
// Dummy
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) {
      throw err
    } else {
      console.log('Dummy test passed successfully')
    }
  })

// enables services
services.map(svc => app[svc.verb](svc.path, svc.callback))

request(app)
  .get('/')
  .expect('Content-Type', /text/)
  .expect(200)
  .end(function(err, res) {
    if (err) {
      throw err
    } else {
      console.log('List services test passed successfully')
    }
  })


const label_id = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)

const email = label_id + '@example.com'
const password = 'OneStr0ngP4sS'

new Promise((resolve) => {
  resolve(request(app)
    .post('/register')
    .send({ email, password })
    .expect(200)
  )
})
.then(() => {
  request(app)
    .post('/login')
    .send({ email, password })
    .expect(200)
    .then(response => {
      const {
        message,
        user
      } = JSON.parse(response.text)
      assert(message, 'Authenticated')
      assert(user.email, email)
      console.log('Auth tests passed successfully')
    })
})
