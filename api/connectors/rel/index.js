import * as models from '../db'

const {
  User
} = models

const force = (process.env.DB_FORCE === 'true' || false)

for (let [key, model] of Object.entries(models)){
  model.sync({ force })
}

export {
  User
}
