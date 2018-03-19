import crypto from 'crypto'
import { db } from '../../connectors'

// Utility function to generate hash
const generateHash = password => bCrypt
  .hashSync(password, bCrypt.genSaltSync(8), null)

// Function used to create a new user
const register = (req, res) => {
    const { User } = db

    const {
      body: {
        email,
        password
      }
    } = req

    const secret = process.env.CRYPTO_AUTH || 'secret'

    const crypt_instance = crypto.createHmac('sha512', secret)
    crypt_instance.update(password)
    const hash = crypt_instance.digest('hex')

    User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        res.send(JSON.stringify({ error: 'That email is already taken' }))
      }
      else {
        User.create({ email, hash }).then(function(newUser, created) {
          let user = {}
          const {
            email,
            status
          } = newUser

          user['email'] = email
          user['status'] = status

          res.send(JSON.stringify({ 'message': 'User created', user }))
        })
      }
    })
}

// Function used to authenticate an user
const login = (req, res) => {
    const { User } = db
    const {
      body: {
        email,
        password
      }
    } = req

    const secret = process.env.CRYPTO_AUTH || 'secret'

    const crypt_instance = crypto.createHmac('sha512', secret)
    crypt_instance.update(password)
    const hash = crypt_instance.digest('hex')

    User.findOne({ where: { email, hash } })
    .then((connectedUser) => {
      if (connectedUser) {
        const {
          email,
          status
        } = connectedUser

        let user = {}
        user['email'] = email
        user['status'] = status

        res.send(JSON.stringify({ message: 'Authenticated', user }))
      } else {
        res.send(JSON.stringify({ error: 'Wrong credentials or user doesn\'t exist' }))
      }
    })
}

// TODO
const authWithToken = () => {
  res.send({ message: 'To be implemented' })
}

export {
  register,
  login,
  authWithToken
}
