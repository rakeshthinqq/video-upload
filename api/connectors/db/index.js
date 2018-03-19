import Sequelize from 'sequelize'
import * as Models from '../../models'

const {
  // Database Model
  DatabaseModel,
  UserModel
} = Models

const db = new Sequelize(
  DatabaseModel.database,
  DatabaseModel.username,
  DatabaseModel.password,
  DatabaseModel.params,
)

// User
const User = db.define(
  UserModel.model,
  UserModel.fields,
  UserModel.params
)

export {
  User
}
