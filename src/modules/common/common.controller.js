import catchController from "../../lib/catch_controller";
import * as CommonService from "./common.service";

export const getAddress = catchController(async (req, res) => {
    return await CommonService.getAddress(req);
});