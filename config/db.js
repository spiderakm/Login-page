const { Sequelize } = require("sequelize")

const createDB = new Sequelize("mydb","spider","pass",{
  dialect:"sqlite",
  host:"./config/db.sqlite"
})

module.exports = createDB;