import catchController from "../../lib/catch_controller";
import * as CommonService from "./common.service";

export const getAddress = catchController(async (req, res) => {
    const data = await CommonService.getAddress(req);
    res.sendJson({
        data
    });
});