import catchController from "../../lib/catch_controller";
import * as GroupService from "./group.service";

export const listGroupByUser = catchController(async (req, res)=>{
    return await GroupService.listGroupByUser(req);
})

export const listCountGroupByUser = catchController(async (req, res) => {
    return await GroupService.listCountGroupByUser(req);
});

export const putUserGroup = catchController(async (req, res)=>{
    return await GroupService.putUserGroupService(req);
})