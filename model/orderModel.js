module.exports = (sequelize, Sequelize) => {

    const Order = sequelize.define('order', {
        // Model attributes are defined here
        order_name: {
            type: Sequelize.STRING
        },
        consumer_no: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        order_no: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        amount: {
            type: Sequelize.INTEGER
            // allowNull defaults to true
        },
        order_status: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        revision: {
            type: Sequelize.INTEGER,
            default: 0
        },
        reason_code:{
            type: Sequelize.STRING
        },
        bill_year_month:{
            type:Sequelize.STRING
        },
        createdAt:Sequelize.DATE,
        updatedAt:Sequelize.DATE
    });

    return Order;
}