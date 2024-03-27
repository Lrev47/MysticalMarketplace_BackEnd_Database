const prisma = require("../db/client");

const createOrderItem = async (quantity, price, productId, orderId) => {
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
    const orderItems = await prisma.orderItem.findMany();
    return orderItems;
  } catch (error) {
    throw error;
  }
};

const getOrderItemById = async (orderitemId) => {
  try {
    const orderitem = await prisma.orderItem.findUnique({
      where: {
        id: parseInt(orderitemId),
      },
    });
    return orderitem;
  } catch (error) {}
};

const getOrderItemsByOrderId = async (orderId) => {
  console.log(`Fetching order items for orderId: ${orderId}`);
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: parseInt(orderId),
      },
    });
    console.log(`Found order items:`, orderItems);
    return orderItems;
  } catch (error) {
    console.error("error", error);
  }
};

const updateOrderItemQuantity = async (orderitemId, newQuantity) => {
  try {
    const updatedOrderItem = await prisma.orderItem.update({
      where: {
        id: parseInt(orderitemId, 10),
      },
      data: {
        quantity: newQuantity,
      },
    });
    console.log("Item Updated", updatedOrderItem);
    return updatedOrderItem;
  } catch (error) {
    console.log(error);
  }
};

const deleteOrderItem = async (orderitemId) => {
  try {
    const orderitem = await prisma.orderItem.delete({
      where: {
        id: parseInt(orderitemId),
      },
    });
    console.log("Item deleted", orderitem);
    return orderitem;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  deleteOrderItem,
  updateOrderItemQuantity,
  getOrderItemsByOrderId,
};
