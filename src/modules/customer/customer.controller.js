import catchController from "../../lib/catch_controller";
import * as CustomerService from "./customer.service";

export const newCustomer = catchController(async (req, res) => {
    return await CustomerService.saveNewCustomer(req);
});

export const phoneExists = catchController(async (req, res) => {
    return await CustomerService.checkPhoneSv(req);
});