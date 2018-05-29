var express =   require('express');
var router = express.Router();
var all = require("./controller/getAllCustomers")
var id = require("./controller/getCustomerByID")

router.get("/", all.getAllCustomers);
router.get("/:id", id.getCustomerByID);

module.exports = router;