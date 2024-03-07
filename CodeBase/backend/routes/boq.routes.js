// Import the express module  
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the user controller
const boqController = require('../controllers/boq.controller');
// Import middleware 
const uploadMiddleware = require("../middlewares/upload.middleware");
// Import error handling middleware
// const { handleMulterError } = require("../middlewares/upload.middleware");

// Create a route to handle the add user request on post
router.post('/api/upload-boq', [uploadMiddleware.ProjectId], uploadMiddleware.uploadFile.single("excel"), boqController.uploadBOQ)
// Add error handling middleware to handle multer errors
// router.use(handleMulterError);

// Export the router
module.exports = router;

