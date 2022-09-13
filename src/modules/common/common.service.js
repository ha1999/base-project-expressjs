import * as CommonValidate from "./common.validate";
import {getAddByQuery} from "./common.repository";

/**
 *
 * @param {object} req
 * @returns {Promise<*>}
 */
export async function getAddress(req) {
    req.action = "Get address province!";
    const value = wrapperValidate(CommonValidate, 'checkGetAddress', req.query);
    return getAddByQuery(value);
}


/**
 *
 * @param {object} root
 * @param {string} nameValidate
 * @param {object} data
 * @returns {object}
 */

export function wrapperValidate(root, nameValidate, data){
    const {value, error} = root[nameValidate](data);
    if(error)
        throw new AppError({message: error.message || "Lỗi validate dữ liệu đầu vào.", code: 400});
    return value;
}