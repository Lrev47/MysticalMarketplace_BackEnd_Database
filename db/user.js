const prisma = require("../db/client");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany();
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(userId, 10),
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
const LogInUser = async (username, password) => {
  try {
    console.log(username, password);
    const loggedInUser = await prisma.users.findUnique({
      where: {
        username: username,
        password: password,
      },
    });
    console.log(loggedInUser);
    if (loggedInUser) {
      const token = jwt.sign({ userId: loggedInUser.id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      return { token, userId: loggedInUser.id };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  LogInUser,
};
