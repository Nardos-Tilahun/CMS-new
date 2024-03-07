// Import the express module  
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the user controller
const userController = require('../controllers/user.controller');
// Import middleware 
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the add user request on post
router.post("/api/user", [authMiddleware.verifyToken, authMiddleware.isAdmin], userController.createUser);
// router.post("/api/user", userController.createUser);
// Create a route to handle the get all users request on get
router.get("/api/users", [authMiddleware.verifyToken, authMiddleware.isAdmin], userController.getAllUsers);
// Export the router
module.exports = router;