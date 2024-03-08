const prisma = require("../db/client");

const getAllProducts = async () => {
  try {
    const products = await prisma.products.findMany();
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: parseInt(productId),
      },
    });
    return product;
  } catch (error) {}
};

module.exports = {
  getAllProducts,
  getProductById,
};
