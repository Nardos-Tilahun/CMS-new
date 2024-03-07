// Import the user service 
const userService = require('../services/user.service');
// Create the add user controller
async function createUser(req, res, next) {

  // console.log(req.header);

  // Check if user email already exists in the database 
  const userExists = await userService.checkIfUserExists(req.body.username);
  // If user exists, send a response to the client
  if (userExists) {
    res.status(400).json({
      error: "This username is already associated with another user. Please use another username!"
    });
  } else {
    try {
      const userData = req.body;
      // console.log(req.body);
      // get the role id
      const role = await userService.getRolesByName(userData.role_name);
      userData.role_id = role[0].role_id;
      // create a user
      const user = await userService.createUser(userData);
      if (!user && !role) {
        res.status(400).json({
          error: "Failed to add the user!"
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Something went wrong!"
      });
    }
  }
}

// Create the getAllUsers controller 
async function getAllUsers(req, res, next) {
  // Call the getAllUsers method from the user service 
  const users = await userService.getAllUsers();
  // console.log(users);
  if (!users) {
    res.status(400).json({
      error: "Failed to get all users!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: users,
    });
  }
}

// Export the createUser controller 
module.exports = {
  createUser,
  getAllUsers
};