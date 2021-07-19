const Sequelize = require('sequelize')
const database = require('../database/db')

const Users = database.define('users', {
  idUser: { type: Sequelize.STRING, primaryKey: true },
  nama: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  freezeTableName: true,
  timestamps: false
})

Users.removeAttribute('id')

module.exports = Users
