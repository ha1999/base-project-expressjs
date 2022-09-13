import {query, queryWithConn} from "../../lib/mysql_connector";
import {rangeArr} from "../../lib/common";

/**
 *
 * @param {object} conn
 * @param {uuid} customer_id
 * @param {uuid} id
 * @param {string} name
 * @param {string} name_key
 * @param {date} dob
 * @param {Nam|Nữ|Khác} gender
 * @param {email} email
 * @param {Array<object>} address
 * @param {text} note
 * @param {uuid} created_by
 * @param {uuid} created_at
 * @param {uuid} updated_by
 * @param {uuid} updated_at
 * @returns {Promise<unknown>}
 */
export async function saveCustomer(conn, customer_id,  {id, name, name_key, dob, gender, email, address, note, created_by, created_at, updated_by, updated_at}){
    const query_str = `INSERT INTO 
                        customer(id, name, name_key, dob, gender, email, address, note, created_by, created_at, updated_by, updated_at) 
                        VALUES(UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, UUID_TO_BIN(?), NOW(), UUID_TO_BIN(?), NOW());`;
    return queryWithConn(conn, query_str, [id, name, name_key, dob, gender, email, address, note, customer_id, customer_id]);
}

/**
 *
 * @param {Array<string>} phones
 * @returns {Promise<void>}
 */
export async function checkPhoneExists(phones){
    const query_str = `SELECT c.name, cp.phone, c.address FROM customer_phone cp INNER JOIN customer c ON cp.customer_id = c.id WHERE cp.phone IN (?) LIMIT 1;`;
    return query(query_str, [phones]);
}

/**
 *
 * @param {object | null} conn
 * @param {Array<string>} phones
 * @param {uuid} id
 * @returns {Promise<void>}
 */
export async function savePhone(conn, phones, id){
    const params = phones.flatMap(phone => [id, phone]);
    const query_str = `INSERT INTO customer_phone(customer_id, phone) 
                       VALUES ${rangeArr((params.length/2)).map(_idx => `(${"UUID_TO_BIN(?), ?"})`).join(",")};`;
    if(conn)
        return queryWithConn(conn, query_str, params);
    return query(query_str, params);
}
/**
 *
 * @param {object | null} conn
 * @param {Array<object>} contracts
 * @param {uuid} id
 * @returns {Promise<void>}
 */
export async function saveContract(conn, contracts, id) {
    const params = contracts.flatMap(contract =>
        [id, contract['contract_id'], contract['service_name'], contract['signing_date'], contract['status']]
    );
    const query_str = `INSERT INTO contract(id, customer_id, contract_id, service_name, signing_date, status) 
                       VALUES ${rangeArr((params.length / 5)).map(_idx => `(${["UUID_TO_BIN(UUID()), UUID_TO_BIN(?), ?, ?, ?, ?"]})`).join(",")};`;
    if(conn)
        return queryWithConn(conn, query_str, params);
    return query(query_str, params);
}

/**
 *
 * @param {object | null} conn
 * @param {Array<uuid>} labels
 * @param {uuid} id
 * @returns {Promise<void>}
 */
export async function saveLabel(conn, labels, id) {
    const params = labels.flatMap(label => [id, label]);

    const query_str = `INSERT INTO customer_label(customer_id, label_id) 
                       VALUES ${rangeArr((params.length/2)).map(_idx => `(${rangeArr(2).map(_el => "UUID_TO_BIN(?)").join(",")})`).join(",")};`;
    if(conn)
        return queryWithConn(conn, query_str, params);
    return query(query_str, params);
}


/**
 *
 * @param {object | null} conn
 * @param {Array<uuid>} groups
 * @param {uuid} id
 * @returns {Promise<void>}
 */
export async function saveGroup(conn, groups, id) {
    const params = groups.flatMap(group => [id, group]);
    const query_str = `INSERT INTO customer_group(customer_id, group_id)
                       VALUES ${rangeArr((params.length/2)).map(_idx => `(${rangeArr(2).map(_el => "UUID_TO_BIN(?)").join(",")})`).join(",")};`;
    if(conn)
        return queryWithConn(conn, query_str, params);
    return query(query_str, params);
}


/**
 *
 * @param {object | null} conn
 * @param {Array<object>} socials
 * @param {uuid} id
 * @returns {Promise<void>}
 */
export async function saveSocial(conn, socials, id) {
    const params = socials.flatMap(social =>
        [id, social['name'], social['url'], social['social_id'], social['phone']]
    );
    const query_str = `INSERT INTO social_info(id, customer_id, name, url, social_id, phone)
        VALUES ${rangeArr((params.length/5)).map(_idx => `(${["UUID_TO_BIN(UUID()), UUID_TO_BIN(?), ?, ?, UUID_TO_BIN(?), ?"]})`).join(",")};`;
    if(conn)
        return queryWithConn(conn, query_str, params);
    return query(query_str, params);
}

