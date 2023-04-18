module.exports = (sequelize, Sequelize) => {

    const Event = sequelize.define('event', {
        // Model attributes are defined here
        perfomed_by: {
            type: Sequelize.INTEGER
        },
        consumer_no: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        name: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        state: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        remarks: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        reason: {
            type: Sequelize.STRING,
        },
        reason_code:{
            type: Sequelize.STRING
        },
        order_no:{
            type:Sequelize.STRING
        },
        amount:Sequelize.INTEGER,
        bill_year_month:Sequelize.STRING,
        device_ts:Sequelize.DATE,
        createdAt:Sequelize.DATE,
        updatedAt:Sequelize.DATE
    });

    return Event;
}