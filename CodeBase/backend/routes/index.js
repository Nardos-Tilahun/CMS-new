// Import the express module 
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the install router 
const installRouter = require('./install.routes');
// Import the user routes 
const userRouter = require('./user.routes');
// Import the login routes 
const loginRoutes = require("./login.routes");
// Import the login routes 
const projectRoutes = require("./project.routes");
// Import the boq routes 
const boqRoutes = require("./boq.routes");
// Add the install router to the main router 
router.use(installRouter);
// Add the user routes to the main router 
router.use(userRouter);
// Add the login routes to the main router
router.use(loginRoutes);
// Add the project routes to the main router
router.use(projectRoutes);
// Add the boq routes to the main router
router.use(boqRoutes);
// Export the router
module.exports = router; 