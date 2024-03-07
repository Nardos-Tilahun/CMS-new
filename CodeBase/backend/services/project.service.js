const conn = require("../config/db.config");
// Import the hash function 
const hashInput = require('./../utility/hashInput');
async function createProject(project) {
    let createdProject = {};
    // console.log(project);
    try {
        const insertQuery = "INSERT INTO projects (project_name, project_location, start_date, end_date, contract_amount, over_head_cost_factor, project_manager_id, client_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const insertRows = await conn.query(insertQuery, [project.project_name, project.project_location, project.start_date, project.end_date, project.contract_amount, project.over_head_cost_factor, project.pm_id, project.client_id]);

        if (insertRows.affectedRows !== 1) {
            return false;
        }

        const projectId = insertRows.insertId;

        const hashedID = await hashInput.generateBcryptHash(projectId);

        const updateQuery = "UPDATE Projects SET project_hash_id = ? WHERE project_id = ?";
        const updateRows = await conn.query(updateQuery, [hashedID, projectId]);

        if (updateRows.affectedRows !== 1) {
            return false;
        }

        createdProject = {
            project_hash_id: hashedID
        };
    } catch (err) {
        console.log(err);
    }
    return createdProject;
}


async function getAllProjects() {
    const query = "SELECT * FROM projects ORDER BY project_id DESC limit 10";
    const rows = await conn.query(query);
    return rows;
}

async function getProjectByID(project_name) {
    const query = `
        SELECT Users.*, Projects.* 
        FROM Projects 
        INNER JOIN Users ON Users.user_id = Projects.client_id 
        INNER JOIN Users ON Users.user_id = Projects.project_manager_id 
        WHERE Projects.project_name = ?;
    `;
    const rows = await conn.query(query, [project_name]);
    return rows;
}
module.exports = {
    createProject,
    getAllProjects,
    getProjectByID
}