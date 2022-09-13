import catchController from "../../lib/catch_controller";
import * as CustomerService from "./customer.service";

export const newCustomer = catchController(async (req, res) => {
    const data = await CustomerService.saveNewCustomer(req);
    res.sendJson({
        data
    });
});

export const phoneExists = catchController(async (req, res) => {
    const [data] = await CustomerService.checkPhoneSv(req);
    res.sendJson({
        data
    });
});