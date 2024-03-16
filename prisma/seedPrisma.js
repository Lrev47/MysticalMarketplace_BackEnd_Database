const { PrismaClient } = require("@prisma/client");
const products = require("../db/ProductData.js");
const users = require("../db/UserData.js");
const orders = require("../db/orderData.js");
const orderItems = require("../db/orderItemData");
const prisma = new PrismaClient();

async function makeInitialData() {
  console.log("Creating Initial User Data...");
  const createdUsers = await Promise.all(
    users.map((user) => prisma.users.create({ data: user }))
  );

  console.log("Creating Initial Product Data...");
  await Promise.all(
    products.map((product) => prisma.products.create({ data: product }))
  );
  console.log("Creating Initial Orders Data...");
  const createdOrdersPromises = orders.map((order) => {
    return prisma.order
      .create({
        data: {
          status: order.status,
          total: order.total,
          userId: order.userId,
        },
      })
      .catch((error) => {
        console.error(`Error creating order for user ${order.userId}:`, error);
        return null; // Return null in case of an error to keep the array's structure for filtering
      });
  });

  const createdOrders = (await Promise.all(createdOrdersPromises)).filter(
    (order) => order !== null
  );

  console.log("Creating Initial OrderItems Data...");

  for (let i = 0; i < orderItems.length; i++) {
    const { quantity, price, orderId, productId } = orderItems[i];
    try {
      await prisma.orderItem.create({
        data: {
          quantity,
          price,
          order: { connect: { id: orderId } },
          product: { connect: { id: productId } },
        },
      });
    } catch (error) {
      console.error("Error");
    }
  }
}

makeInitialData()
  .then(() => {
    console.log("Seeding completed successfully.");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error("Error during seeding:", error);
    prisma.$disconnect();
  });
