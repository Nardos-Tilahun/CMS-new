// Import the jsonwebtoken module
const jwt = require("jsonwebtoken");
// Import the secret key from the environment variables
const jwtSecret = process.env.JWT_SECRET;
// Import the Project service 
const ProjectService = require('../services/project.service');
const userService = require('../services/user.service');

// Create the add Project controller
async function createProject(req, res, next) {

    // console.log(req.header);

    try {
        const ProjectData = req.body;
        // console.log(req.body);
        // get the PM and Client id
        const ProjectManager = await userService.getUserByUsername(req.username);
        ProjectData.pm_id = ProjectManager[0].user_id;
        const Client = await userService.getUserByUsername(ProjectData.client_username);
        ProjectData.client_id = Client[0].user_id;

        // create a Project
        const Project = await ProjectService.createProject(ProjectData);
        if (!Project) {
            res.status(400).json({
                error: "Failed to add the Project!"
            });
        } else {
            const payload = {
                project: Project.project_hash_id,

            };
            const token = jwt.sign(payload, jwtSecret, {
                expiresIn: "24h",
            });
            // console.log(token);
            const sendBack = {
                project_token: token,
            };
            res.status(200).json({
                status: "success",
                message: "project created successfully",
                data: sendBack,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "Something went wrong!"
        });
    }
}

// Create the getAllProjects controller 
async function getAllProjects(req, res, next) {
    // Call the getAllProjects method from the Project service 
    const Projects = await ProjectService.getAllProjects();
    // console.log(Projects);
    if (!Projects) {
        res.status(400).json({
            error: "Failed to get all Projects!"
        });
    } else {
        res.status(200).json({
            status: "success",
            data: Projects,
        });
    }
}

// Export the createProject controller 
module.exports = {
    createProject,
    getAllProjects
};