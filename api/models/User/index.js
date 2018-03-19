import Sequelize from 'sequelize'

const model = 'user'
const tableName = 'users'

const UserModel = {
  model,
  fields: {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    firstname : Sequelize.STRING,
    lastname : Sequelize.STRING,
    username : Sequelize.TEXT,
    about : Sequelize.TEXT,
    email: {
      type: Sequelize.STRING,
      validate: {
          isEmail: true
      }
    },
    hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_login: {
      type: Sequelize.DATE
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    session: Sequelize.STRING
  },
  params: {
    'timestamps': false,
    'paranoid': false,
    'underscored': true,
    'freezeTableName': true,
    tableName
  }
}

export { UserModel }
