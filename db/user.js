const prisma = require("../db/client");

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

    if (loggedInUser) {
      return loggedInUser;
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
