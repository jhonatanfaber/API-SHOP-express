var express = require('express');
var router = express.Router();
var all = require("./controller/getAllCustomers");
var id = require("./controller/getCustomerByID");
var newCustomer = require("./controller/createNewCustomer");
var update = require("./controller/updateCustomer");
var remove = require("./controller/deleteCustomer");

router.get("/", all.getAllCustomers);
router.get("/:id", id.getCustomerByID);
router.post("/", newCustomer.createNewCustomer);
router.put("/:id", update.updateCustomer);
router.delete("/:id", remove.deleteCustomer);


module.exports = router;