var express =   require('express');
var router = express.Router();
var all = require("./controller/getAllCustomers");
var id = require("./controller/getCustomerByID");
var newCustomer = require("./controller/createNewCustomer");

router.get("/", all.getAllCustomers);
router.get("/:id", id.getCustomerByID);
router.post("/", newCustomer.createNewCustomer);


module.exports = router;