const Sequelize = require('sequelize')


const sequelize = new Sequelize('pgtulhas', 'pgtulhas', 'rnga0hJ7jUv1NO834DQt2rI8Dksv8rgE', {
  host: 'kashin.db.elephantsql.com',
  dialect: 'postgres',
  logging: false
})


module.exports = sequelize