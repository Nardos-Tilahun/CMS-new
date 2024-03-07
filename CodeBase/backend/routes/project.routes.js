// Import the express module  
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the project controller
const projectController = require('../controllers/project.controller');
// Import middleware 
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the add project request on post
router.post("/api/project", [authMiddleware.verifyToken, authMiddleware.isPM], projectController.createProject);
// Create a route to handle the get all projects request on get
router.get("/api/projects", [authMiddleware.verifyToken, authMiddleware.isAdmin], projectController.getAllProjects);
// Export the router
module.exports = router;