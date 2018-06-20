const express = require('express');
const router = express.Router();
const all = require("./controller/getAllCustomers");
const id = require("./controller/getCustomerByID");
const newCustomer = require("./controller/createNewCustomer");
const update = require("./controller/updateCustomer");
const remove = require("./controller/deleteCustomer");

router.get("/", all.getAllCustomers);
router.get("/:id", id.getCustomerByID);
router.post("/", newCustomer.createNewCustomer); 
router.put("/:id", update.updateCustomer);
router.delete("/:id", remove.deleteCustomer);

module.exports = router;