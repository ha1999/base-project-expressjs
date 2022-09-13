import {query, queryWithConn} from "../../lib/mysql_connector";


export async function getListGroupRepository(user_id) {
    return await query(`SELECT BIN_TO_UUID(g.id) as id, g.name, g.name_key, g.color FROM \`group\` g WHERE g.created_by = UUID_TO_BIN(?)`, [user_id]);
}

/**
 *
 * @param user_id
 * @returns {Promise<void>}
 */
export async function getCountGroupByUserRep(user_id) {
    const query_str = `SELECT BIN_TO_UUID(g.id) as id, g.name, g.name_key, count(c.id) as count, g.color FROM \`group\` as g
                            LEFT JOIN user_group ug on g.id = ug.group_id
                            LEFT JOIN customer_group cg on g.id = cg.group_id
                            LEFT JOIN customer c on cg.customer_id = c.id
                            WHERE ug.user_id = UUID_TO_BIN(?)
                            GROUP BY g.name_key
                            ORDER BY ug.order`;
    return await query(query_str, [user_id]);
}

/**
 *
 * @param conn
 * @param group_id
 * @param user_id
 * @returns {Promise<*>}
 */
export async function putUserGroupRep(conn, group_id, user_id) {
    await queryWithConn(conn, `DELETE FROM user_group WHERE user_id = UUID_TO_BIN(?)`, [user_id]);

    return await queryWithConn(conn, `INSERT INTO user_group(id, user_id, group_id, \`order\`)
                          VALUES ${group_id.flatMap(_ => `(UUID_TO_BIN(UUID()), UUID_TO_BIN(?), UUID_TO_BIN(?), ?)`).join(",")};`,
        group_id.flatMap((gi, index )=> [user_id, gi, index]));
}