module.exports = (sequelize, Sequelize) => {

    const Consumer =    sequelize.define('consumer',{
        // Model attributes are defined here
        consumer_no: {
          type: Sequelize.STRING
        },
        name: {
          type: Sequelize.STRING
          // allowNull defaults to true
        },
        createdAt: {
          type: Sequelize.DATE
          // allowNull defaults to true
        },
        updatedAt: {
            type: Sequelize.DATE
            // allowNull defaults to true
        },
        phone: {
            type: Sequelize.STRING,
            // allowNull: false
        },
      });
      
      return Consumer;
}