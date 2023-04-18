const orderService = require('../service/orderService');
const logger = require('../logger/apiLogger');

module.exports = router => {
  router.post("/createConsumer", async (req, res, next) => {
    try {
      let createConsumerData = await orderService.createConsumer(req.body);
      res.status(200).json(createConsumerData);
    } catch (error) {
      
      let errorMessage=error.message
      res.status(500).json({message:errorMessage});
    }
  });
  router.post("/createOrder", async (req, res, next) => {
    try {
      let createOrderData = await orderService.createOrder(req.body);
      res.status(200).json(createOrderData);
    } catch (error) {
      let errorMessage=error.message
      res.status(500).json({message:errorMessage});
    }
  });
  router.post("/consumerPayment", async (req, res, next) => {
    try {
      let consumerPaymentData = await orderService.createPayment(req.body);
      res.status(200).json(consumerPaymentData);
    } catch (error) {
      let errorMessage=error.message
      res.status(500).json({message:errorMessage});
    }
  });
  router.post("/withoutPayment", async (req, res, next) => {
    try {
      let withoutPaymentData = await orderService.withoutPayment(req.body);
      res.status(200).json(withoutPaymentData);
    } catch (error) {
      let errorMessage=error.message
      res.status(500).json({message:errorMessage});
    }
  });
}