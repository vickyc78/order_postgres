const { Sequelize} = require("sequelize");

    const hostName = process.env.HOST;
    const userName = process.env.USER;
    const password = process.env.PASSWORD;
    const database = process.env.DB;
    const dialect = process.env.DIALECT;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect: dialect,
        operatorsAliases: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });
// console.log("sequelize",sequelize)
    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.consumers = require("../model/consumerModel")(sequelize, Sequelize);
    db.orders=require("../model/orderModel")(sequelize, Sequelize)
    db.events=require("../model/eventModel")(sequelize, Sequelize)
console.log("db",db)
module.exports = db