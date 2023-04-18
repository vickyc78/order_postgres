const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

const taskController = require('./controller/orderController')

let router = express.Router();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

let orderRoutes = require("./controller/orderController");

app.use("/Order", router);

orderRoutes(router);
const cron=require("./config/cron")
const connect = require("./config/dbConfig");
connect.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", function(req, res) {
    res.send("Hello Express");
  });



app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})