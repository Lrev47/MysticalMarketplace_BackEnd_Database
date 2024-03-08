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
        id: parseInt(userId),
      },
    });
    return user;
  } catch (error) {}
};

module.exports = {
  getAllUsers,
  getUserById,
};
