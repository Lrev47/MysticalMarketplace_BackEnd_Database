const prisma = require("../db/client");

const createOrderItem = async () => {
  try {
    const NewOrderItem = await prisma.orderitem.create({
      data: {
        quantity: quantity,
        productId: productId,
        orderId: orderId,
      },
    });
    return NewOrderItem;
  } catch (error) {
    console.log(error);
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
