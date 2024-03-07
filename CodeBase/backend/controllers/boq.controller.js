// Import the user service 
const boqService = require('../services/boq.service');
const path = require('path');
const __basedir = path.resolve();
async function uploadBOQ(req, res, next) {
    const file = req.file; // Access the uploaded file
    const project_id = req.project_id;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(__basedir, '/uploads/', file.filename);
    boqService.importFileToDb(filePath, project_id);

    res.status(200).send('File uploaded successfully.');
}

module.exports = {
    uploadBOQ
};
