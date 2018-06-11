var express =   require('express');
var router = express.Router();
var all = require("./controller/getAllCustomers");
var id = require("./controller/getCustomerByID");
var newCustomer = require("./controller/createNewCustomer");
var update = require("./controller/updateCustomer");

router.get("/", all.getAllCustomers);
router.get("/:id", id.getCustomerByID);
router.post("/", newCustomer.createNewCustomer);
router.put("/:id", update.updateCustomer);


module.exports = router;