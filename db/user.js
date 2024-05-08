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

const updateMoneyByUserId = async (userId, moneyNum) => {
  try {
    console.log("USER ID BEFORE MONEY FUNCTION", userId);
    const updatedUser = await prisma.users.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        moneyNum: {
          increment: parseFloat(moneyNum),
        },
      },
    });
    return updatedUser;
  } catch (error) {
    console.error(error);
  }
};

const getUserBalance = async (userId) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
      select: { moneyNum: true },
    });
    if (user) {
      console.log("User balance retrieved:", user.moneyNum);
      return user.moneyNum;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user balance:", error);
    throw error;
  }
};

const deductFromUserBalance = async (userId, totalCost) => {
  try {
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(userId) },
      data: { balance: { decrement: parseFloat(totalCost) } },
    });
    console.log("User Balance is updaed", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUserMoney = async (userId, totalBalance) => {
  try {
    console.log("INFO HIT DB FUNCTION:", userId, totalBalance);
    const updatedMoney = await prisma.users.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        moneyNum: {
          decrement: totalBalance,
        },
      },
    });
    console.log("User Money Updated");
    console.log("THE UPDATED MONEY SHOULD BE", updatedMoney);
    return updatedMoney;
  } catch (error) {
    console.error(error);
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
      include: {
        Order: true,
      },
    });
    console.log(loggedInUser);
    if (loggedInUser) {
      const token = jwt.sign({ userId: loggedInUser.id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      return { token, userId: loggedInUser.id, Order: loggedInUser.Order };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  LogInUser,
  updateMoneyByUserId,
  deductFromUserBalance,
  updateUserMoney,
  getUserBalance,
};
