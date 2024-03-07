// Import the query function from the db.config.js file 
const conn = require("../config/db.config");
// Import the hash function 
const hashInput = require('./../utility/hashInput');
// A function to check if user exists in the database 
async function checkIfUserExists(username) {
  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const rows = await conn.query(query, [username]);
    // console.log(rows);
    return rows.length > 0; // Returns true if user exists, false otherwise
  } catch (error) {
    console.error("Error executing query:", error);
    return false; // Return false to indicate an error occurred
  }
}

// A function to create a new user 
async function createUser(user) {
  let createdUser = {};
  try {
    //generate the hash password
    const hashedPassword = await hashInput.generateBcryptHash(user.password);
    // Insert the email in to the users table  
    const query = "INSERT INTO users (username, password, role_id, first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const rows = await conn.query(query, [user.username, hashedPassword, user.role_id, user.first_name, user.last_name, user.email, user.phone_number]);
    // console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the user id from the insert 
    const user_id = rows.insertId;

    createdUser = {
      user_id: user_id
    }
  } catch (err) {
    console.log(err);
  }
  // Return the user object 
  return createdUser;
}
// A function to get user by email
async function getUserByUsername(username) {
  const query = `SELECT users.*, roles.* 
  FROM users 
  INNER JOIN Roles ON users.role_id = roles.role_id 
  WHERE users.username = ?; `;
  const rows = await conn.query(query, [username]);
  return rows;
}
// A function to get all users
async function getAllUsers() {
  const query = "SELECT * FROM users ORDER BY user_id DESC limit 10";
  const rows = await conn.query(query);
  return rows;
}

async function getRolesByName(roleName) {
  const query = "SELECT * FROM roles WHERE role_name = ?";
  const rows = await conn.query(query, [roleName]);
  return rows;
}
// Export the functions for use in the controller
module.exports = {
  checkIfUserExists,
  createUser,
  getUserByUsername,
  getAllUsers,
  getRolesByName,
};