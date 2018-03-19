import dotenv from 'dotenv'
dotenv.config()

import {
  operatorsAliases
} from './operators'

const DatabaseModel = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  params: {
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_PATH,
    logging: false,
    operatorsAliases
  }
}

export { DatabaseModel }
