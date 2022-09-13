import catchController from "../../lib/catch_controller";
import * as GroupService from "./group.service";

export const listGroupByUser = catchController(async (req, res)=>{
    const data = await GroupService.listGroupByUser(req);
    res.sendJson({
        data
    });
})

export const listCountGroupByUser = catchController(async (req, res) => {
    const data = await GroupService.listCountGroupByUser(req);
    res.sendJson({
        data
    });
});

export const putUserGroup = catchController(async (req, res)=>{
    const data = await GroupService.putUserGroupService(req);
    res.sendJson({
        data
    });
})