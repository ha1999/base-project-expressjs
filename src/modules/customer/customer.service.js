import {randomUUID} from 'crypto';
import {saveCustomer, checkPhoneExists, saveGroup, saveLabel, saveSocial, saveContract, savePhone} from "./customer.repository";
import * as CustomerValidate from "./customer.validate";
import {queryTransaction} from "../../lib/mysql_connector";
import {wrapperValidate} from "../common/common.service";
import {change_alias, returnUnique} from "../../lib/common";

/**
 *
 * @param {object} req
 * @returns {Promise<*>}
 */
export async function saveNewCustomer(req) {
    const customer_id = randomUUID();
    req.action = "Create new customer!";
    const customer_data = wrapperValidate(CustomerValidate, 'checkCustomerData', req.body);
    customer_data.phone = customer_data.phone.map(el => el.replace("+84", "0"));
    const [data] = await checkPhoneExists(customer_data.phone);
    if(data)
        throw new AppError({message: "Số điện thoại đã tồn tại trong hệ thống!", code: 400});
    customer_data.profile.address = JSON.stringify(customer_data.profile.address);
    customer_data.profile.name_key = change_alias(customer_data.profile.name);
    const transactionSaveCustomer = async (conn) => {
        await saveCustomer(conn, req.user.id || "410daedf-2dd3-11ed-9394-0242c0a80103", {id: customer_id, ...customer_data.profile});
        await Promise.all([
            saveGroup(conn, returnUnique(customer_data.group), customer_id),
            saveLabel(conn, returnUnique(customer_data.label), customer_id),
            savePhone(conn, returnUnique(customer_data.phone), customer_id),
            saveSocial(conn, customer_data.social_profile, customer_id),
            saveContract(conn, customer_data.contract, customer_id)
        ])
    }
    return queryTransaction(transactionSaveCustomer);
}
/**
 *
 * @param {object} req
 * @returns {Promise<*>}
 */
export async function checkPhoneSv(req) {
    req.action = "Check phone exists in db!";
    const {phone} = wrapperValidate(CustomerValidate, 'checkPhone', req.query);
    return checkPhoneExists([phone]);
}