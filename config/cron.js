let connect = require("./dbConfig")
let orderService = require("../service/orderService")
let logger = require("../logger/apiLogger")
var cron = require('node-cron');

let Event = connect.events
let Consumer = connect.consumers
const Op = connect.Sequelize.Op;

// var condition = ;
cron.schedule('*/10 * * * *', async () => {
  try {
    logger.info('running a task every ten minute');
    let allConsumer = await Consumer.findAll({})
    logger.info("Fetched all the consumer", allConsumer)
    if (allConsumer && allConsumer.length<=0){
      throw new Error("No consumer found")
    }
      allConsumer.forEach(async element => {
        let eventData = await Event.findAll({
          where: { name: 'PAYMENT', consumer_no: `${element.consumer_no}` }
        })
        if (eventData && eventData.length <= 0) {
          let orderObj = {
            "order_name": "cable",
            "consumer_no": element.consumer_no,
            "order_no": `ORDER-${new Date().getMilliseconds()}`,
            "amount": 500,
            "order_status": "ISSUED",
            "reason_code": "Exceed due date",
            "bill_year_month": "APR-23"
          }
          let orderData = await orderService.createOrder(orderObj)
          logger.info("Order is created successfully", orderData)
        }
      });
  } catch (error) {
    logger.info("Error while running cron job", error)
  }
});