const Sequelize = require('sequelize')
const databaseConnection = new Sequelize('restoran', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
})

module.exports = databaseConnection
