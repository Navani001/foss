// User model
const user = {
  username: "admin",
  password: "12345"
};

// Find user by username and password
const findUser = (username, password) => {
  if (username === user.username && password === user.password) {
    return user;
  }
  return null;
};

module.exports = {
  findUser
};
