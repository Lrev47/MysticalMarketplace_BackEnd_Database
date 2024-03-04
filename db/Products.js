const prisma = require("../db/client");

const getAllProducts = async () => {
  try {
    const products = await prisma.products.findMany();
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProducts,
};
