// Import the query function from the db.config.js file 
const conn = require("../config/db.config");
// Import the bcrypt module to do the password comparison 
const bcrypt = require('bcrypt');
// Import the User service to get User by email  
const UserService = require("./user.service");
// Handle User login 
async function logIn(UserData) {
  try {
    let returnData = {}; // Object to be returned
    const User = await UserService.getUserByUsername(UserData.username);
    if (User.length === 0) {
      returnData = {
        status: "fail",
        message: "User does not exist"
      };
      return returnData;
    }
    const passwordMatch = await bcrypt.compare(UserData.password, User[0].password);
    if (!passwordMatch) {
      returnData = {
        status: "fail",
        message: "Incorrect password"
      };
      return returnData;
    }
    returnData = {
      status: "success",
      data: User[0]
    };
    return returnData;
  } catch (error) {
    console.log(error);
  }
}

// Export the function 
module.exports = {
  logIn
};