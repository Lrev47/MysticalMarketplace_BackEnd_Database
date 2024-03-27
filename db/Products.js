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

const updateMultipleProductQuantities = async (productsToUpdate) => {
  try {
    const productUpdates = productsToUpdate.map((product) => {
      return prisma.products.update({
        where: {
          id: parseInt(product.productId),
        },
        data: {
          quantity: {
            decrement: parseInt(product.quantityToSubtract),
          },
        },
      });
    });
    const updatedProducts = await prisma.$transaction(productUpdates);
    console.log("Updated products");
    return updatedProducts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateProductQuantity = async (productId, newQuantity) => {
  try {
    const updatedProduct = await prisma.products.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        quantity: newQuantity,
      },
    });
    console.log("Product Updated");
    return updatedProduct;
  } catch (error) {}
};

module.exports = {
  getAllProducts,
  getProductById,
  updateProductQuantity,
  updateMultipleProductQuantities,
};
