const prisma = require("../db/client");

const createOrder = async (status, price, quantity, userId) => {
  const newOrder = await prisma.order.create({
    data: {
      status: status,
      total: price * quantity,
      quantity: quantity,
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

// const updateOrderItemQuantity = async (orderitemId, newQuantity) => {
//   try {
//     const updatedOrderItem = await prisma.orderItem.update({
//       where: {
//         id: parseInt(orderitemId),
//       },
//       data: {
//         quantity: newQuantity,
//       },
//     });
//     console.log("ItemUpdated");
//   } catch (error) {}
// };

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
};
