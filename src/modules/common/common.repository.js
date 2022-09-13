import {query} from "../../lib/mysql_connector";

/**
 *
 * @param {object} data
 * @returns {Promise<unknown>}
 */
export async function getAddByQuery(data){
    if(!data.id)
        return query(`SELECT * FROM province WHERE 1;`);
    const district = data.type === 'district';
    const query_str = district ?
        `SELECT id, prefix, name FROM district WHERE province_id = ?`:
        `SELECT w.id, w.prefix, name FROM ward w WHERE district_id = ? 
        AND province_id = (SELECT province_id FROM district WHERE id = ?)`;
    const params = district ? [data.id] : [data.id, data.id];
    return query(query_str, params);
}