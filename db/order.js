const prisma = require("../db/client");

const createOrder = async (userId, quantity, price) => {
  const newOrder = await prisma.order.create({
    data: {
      userId: userId,
      status: "pending",
      total: price * quantity,
      quantity,
      quantity,
    },
  });
};
