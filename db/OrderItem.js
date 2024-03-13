const prisma = require("../db/client");

const createOrderItem = async (orderId, productId, quantity, price) => {
  try {
    const newOrderItem = await prisma.orderItem.create({
      data: {
        quantity: quantity,
        price: price,
        productId: productId,
        orderId: orderId,
      },
    });
    return newOrderItem;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllOrderItems = async () => {
  try {
    const orderItems = await prisma.orderitem.findMany();
    return orderItems;
  } catch (error) {
    throw error;
  }
};

const getOrderItemById = async (orderitemId) => {
  try {
    const orderitem = await prisma.orderitem.findUnique({
      where: {
        id: parseInt(orderitemId),
      },
    });
    return orderitem;
  } catch (error) {}
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
};
