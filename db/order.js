const prisma = require("../db/client");

const createOrder = async (userId) => {
  const newOrder = await prisma.order.create({
    data: {
      userId: parseInt(userId),
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

const updateOrderStatusById = async (orderId, newStatus) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId, 10) },
      data: { status: newStatus },
    });
    return updatedOrder;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

const updateOrderTotalById = async (orderId, newTotal) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId, 10) },
      data: { total: newTotal },
    });
    return updatedOrder;
  } catch (error) {
    console.error("Error updating order Total:", error);
    throw error;
  }
};

const getPendingOrderByUserId = async (userId) => {
  try {
    console.log({ userId });
    const userIdNum = parseInt(userId, 10);
    const pendingOrder = await prisma.order.findFirst({
      where: {
        userId: userIdNum,
        status: "pending",
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
    return pendingOrder;
  } catch (error) {
    console.error(error);
  }
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
  createOrder,
  deleteOrder,
  findOrCreatePendingOrder,
  updateOrderTotalById,
  updateOrderStatusById,
  getPendingOrderByUserId,
};
