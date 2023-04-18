const connect = require('../config/dbConfig');
// console.log("connect",connect)
const Order = connect.orders
const Event = connect.events
const Consumer = connect.consumers
const Op = connect.Sequelize.Op;
const logger = require('../logger/apiLogger');

module.exports = {

    /**
     * This function will create the consumer.
     * @param {consumer_no,order_no,amount,bill_year_month} consumerObj 
     * @returns consumer as a response
     */
    async createConsumer(consumerObj) {
        try {
            logger.info('Inside creation of consumer', consumerObj)

            let consumerData = await Consumer.create(consumerObj)
            logger.info("Consumer stored in data base result is :::", consumerData)
            return consumerData
        } catch (err) {
            logger.error('Error whil creating consumer::' + err);
            throw new Error(err)
        }
    },

    /**
     * This function will create the order.
     * @param {order_name,consumer_no,order_no,amount,order_status,reason_code,bill_year_month} orderObj 
     * @returns order as a response
     */
    async createOrder(orderObj) {
        try {
            logger.info('Inside creation of order', orderObj)
            let checkConsumer = await this.checkConsumer(orderObj.consumer_no)
            if (!checkConsumer) {
                throw new Error("Please enter valid consumer number")
            }
            let orderData = await Order.create(orderObj)
            logger.info("Order stored in data base :::", orderData)
            return orderData
        } catch (err) {
            logger.error('Error whil creating order::' + err);
            throw new Error(err)
        }
    },

    /**
     * This function will create the payment and store the event.
     * @param {consumer_no,order_no,amount,bill_year_month} paymentObj 
     * @returns order updation status as a response
     */
    async createPayment(paymentObj) {
        try {
            logger.info('Inside payment function service', paymentObj)
            let checkConsumer = await this.checkConsumer(paymentObj.consumer_no)
            if (!checkConsumer) {
                throw new Error("Please enter valid consumer number")
            }
            let eventObj = {
                consumer_no: paymentObj.consumer_no,
                name: 'PAYMENT',
                state: "COMPLETED",
                remarks: "Order payment",
                reason: "Payment of orders",
                reason_code: "Order payment success",
                order_no: paymentObj.order_no,
                amount: paymentObj.amount,
                bill_year_month: paymentObj.bill_year_month
            }
            let eventData = await this.saveEvent(eventObj)
            logger.info("Event creation Complete:::", eventData)
            if (eventData && eventData.id) {

                let orderData = await this.updateOrder({ order_no: paymentObj.order_no, status: 'CLOSED' })
                return orderData
            }
        } catch (err) {
            logger.error('Error while creting payment::', err);
            throw new Error(err)
        }
    },

    /**
     * This function check whether any order status has ISSUED then will create event data and update the order status.
     * @param {consumer_no,order_no,amount,bill_year_month} paymentObj 
     * @returns order updation status as a response
     */
    async withoutPayment(paymentObj) {
        try {
            logger.info('Inside with out payment function service', paymentObj)
            let checkConsumer = await this.checkConsumer(paymentObj.consumer_no)
            if (!checkConsumer) {
                throw new Error("Please enter valid consumer number")
            }
            let orderStatus = await Order.findAll({ limit: 1, where: { consumer_no: paymentObj.consumer_no, order_no: paymentObj.order_no }, order: [['createdAt', 'DESC']] },)
            if (orderStatus && orderStatus[0].order_status != 'ISSUED') {
                throw new Error("There is no order status with ISSUED")
            }
            let eventObj = {
                consumer_no: paymentObj.consumer_no,
                name: 'DISCONNECTION_DONE',
                state: "COMPLETED",
                remarks: "Order not paid",
                reason: "User will not paying the bill",
                reason_code: "Order payment failed",
                order_no: paymentObj.order_no,
                amount: paymentObj.amount,
                bill_year_month: paymentObj.bill_year_month
            }
            let insertData = await Event.create(eventObj)
            logger.info("insertData", insertData)
            if (insertData && insertData.id) {
                let orderData = await this.updateOrder({ order_no: paymentObj.order_no, status: 'DONE' })
                return orderData
            }
        } catch (err) {
            logger.error('Error while transaction::', err);
            throw new Error(err)
        }
    },

    /**
     * This function find the consumer from db.
     * @param {*} consumerNo 
     * @returns bollean value as a response
     */
    async checkConsumer(consumerNo) {
        try {
            let consumerData = await Consumer.findAll({ limit: 1, where: { consumer_no: consumerNo }, order: [['createdAt', 'DESC']] })
            if (consumerData && consumerData.length && consumerData.length >= 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            logger.error('Error while fetching consumer::', error);
            throw new Error(error)
        }
    },

    /**
     * This function will update the order.
     * @param {order_no,status} orderObj 
     * @returns order updation status as a response
     */
    async updateOrder(orderObj) {
        try {
            let orderData = await Order.findAll({ limit: 1, where: { order_no: orderObj.order_no }, order: [['createdAt', 'DESC']] })
            if (orderData && orderData.length && orderData.length >= 0) {
                let updatedOrderData = await Order.update({ order_status: orderObj.status }, {
                    where: { order_no: orderObj.order_no }
                })
                if (updatedOrderData && updatedOrderData.length) {
                    return "Order Updated Successfully"
                } else {
                    throw new Error("Failed to update order")
                }
            } else {
                throw new Error("No order found")
            }
        } catch (error) {
            logger.error('Error while fetching Order::', error);
            throw new Error(error)
        }
    },

    /**
     * This function will save the eventObj in event table.
     * @param {*} eventObj 
     * @returns save event data as a response
     */
    async saveEvent(eventObj) {
        try {
            let eventData = await Event.create(eventObj)
            return eventData
        } catch (error) {
            logger.error('Error while saving event::', error);
            throw new Error(error)
        }
    }

}
