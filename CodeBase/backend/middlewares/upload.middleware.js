const boqService = require('../services/boq.service');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const __basedir = path.resolve();

const ProjectId = async (req, res, next) => {
    try {
        let token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send({
                status: "fail",
                message: "No token provided!"
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    status: "fail",
                    message: "Unauthorized!"
                });
            }

            const project_id = await boqService.getProjectIdByHashId(decoded.project);

            const isBOQExist = await boqService.checkBOQExistence(project_id);
            if (isBOQExist) {
                return res.status(400).send({
                    status: "fail",
                    message: "BOQ already exist for the specific project"
                });
            }

            req.project_id = project_id;
            next();
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            status: "error",
            message: "Internal server error"
        });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    },
})

const uploadFile = multer({ storage: storage })

module.exports = {
    uploadFile,
    ProjectId
};
