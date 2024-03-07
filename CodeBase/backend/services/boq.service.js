const conn = require("../config/db.config");
const readXlsxFile = require('read-excel-file/node');

async function importFileToDb(exFile, project_id) {
    try {
        const rows = await readXlsxFile(exFile);

        if (rows.length <= 1) {
            throw new Error('No valid rows found in the Excel file.');
        }

        rows.shift(); // Remove header row

        const dataToInsert = [];

        let currConcDesc = '';

        for (let row of rows) {
            if (row[3] !== null) {
                if (currConcDesc !== '') {
                    currConcDesc += row[1] + ' ';
                    dataToInsert.push({ boq_item_no: row[0], item_name: currConcDesc.trim(), unit_of_measurement: row[2], contract_quantity: row[3], unit_price_rate: row[4], Contract_Amount: row[5], project_id });
                    currConcDesc = '';
                }
            } else {
                currConcDesc += row[1] + ' ';
            }
        }

        if (currConcDesc !== '') {
            dataToInsert.push({ boq_item_no: '', item_name: currConcDesc.trim(), unit_of_measurement: '', contract_quantity: '', unit_price_rate: '', Contract_Amount: '', project_id: '' });
        }

        if (dataToInsert.length === 0) {
            throw new Error('No valid rows found in the Excel file.');
        }

        // Constructing the insert query dynamically with the correct number of placeholders
        let queryStr = 'INSERT INTO Bill_of_Quantities (boq_item_no, item_name, unit_of_measurement, contract_quantity, unit_price_rate, Contract_Amount, project_id) VALUES ';
        const placeholders = dataToInsert.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(', ');
        queryStr += placeholders;

        const flattenedDataToInsert = dataToInsert.flatMap(obj => [obj.boq_item_no, obj.item_name, obj.unit_of_measurement, obj.contract_quantity, obj.unit_price_rate, obj.Contract_Amount, obj.project_id]); // Flatten the array for values
        const result = await conn.query(queryStr, flattenedDataToInsert);
        console.log(result);
        return result;

    } catch (error) {
        console.error(error);
        throw error;
    }
}




async function getProjectIdByHashId(projectHashId) {
    const query = 'SELECT project_id FROM Projects WHERE project_hash_id = ?';
    const rows = await conn.query(query, [projectHashId]);
    return rows[0].project_id;
}

async function checkBOQExistence(projectId) {
    const query = 'SELECT COUNT(*) AS count FROM Bill_of_Quantities WHERE project_id = ?';
    const rows = await conn.query(query, [projectId]);
    return rows[0].count !== 0;
}

module.exports = {
    importFileToDb,
    getProjectIdByHashId,
    checkBOQExistence
};
