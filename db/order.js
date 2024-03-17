const prisma = require("../db/client");

const createOrder = async (userId) => {
  const newOrder = await prisma.order.create({
    data: {
      userId: userId,
    },
  });
  return newOrder;
};

const getAllOrders = async () => {
  try {
    const orders = await prisma.order.findMany();
    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrderById = async (orderId) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(orderId),
      },
    });
    return order;
  } catch (error) {}
};

const findOrCreatePendingOrder = async (userId) => {
  try {
    // Try to find an existing order that is pending for the user
    let order = await prisma.order.findFirst({
      where: {
        userId: userId,
        status: "pending", // Assuming "pending" is the status of orders that are not finalized
      },
    });

    // If no such order exists, create a new one
    if (!order) {
      order = await prisma.order.create({
        data: {
          userId: userId,
          status: "pending",
          // Add other initial order fields as necessary
        },
      });
    }

    return order;
  } catch (error) {
    console.error("Error in findOrCreatePendingOrder:", error);
    throw error; // It's better to throw the error and handle it in the calling context
  }
};
const deleteOrder = async (orderId) => {
  try {
    const order = await prisma.order.delete({
      where: {
        id: parseInt(orderId),
      },
    });
    console.log("Item deleted", order);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  findOrCreatePendingOrder,
};
