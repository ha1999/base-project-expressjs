import express from "express";
import * as CustomerController from "./customer.controller";
const router_customer = express.Router({});
router_customer.post('/new', CustomerController.newCustomer);
router_customer.get('/phone-exists', CustomerController.phoneExists);
export default router_customer;