import * as Validate from "./group.validate";
import {getCountGroupByUserRep, getListGroupRepository, putUserGroupRep} from "./group.repository";
import {queryTransaction} from "../../lib/mysql_connector";


export async function listGroupByUser(req){
    req.action = "Get list group by user creat at by";
    return getListGroupRepository(req.user.id || 'cdf1249d-0cba-11ed-92fd-0050568d1f0e');
}

export async function listCountGroupByUser(req) {
    req.action = "Get list count group by user!";
    return getCountGroupByUserRep(req.user.id || '708b2cbe-cabe-474c-a323-b6738a8a9864');
}

export async function putUserGroupService(req){
    req.action = "Put user group";
    const {error, value} = Validate.checkUpdateUserGroup(req.body.group_id);
    if (error)
        throw new AppError({message: 'Lỗi validate dữ liệu đầu vào!', code: error.code || 400});
    return await queryTransaction(putUserGroupRep, value, req.user.id || "708b2cbe-cabe-474c-a323-b6738a8a9864");

}