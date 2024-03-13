const { PrismaClient } = require("@prisma/client");
const products = require("../db/ProductData.js");
const users = require("../db/UserData.js");

const prisma = new PrismaClient();

async function makeInitialData() {
  console.log("Creating Initial User Data...");
  for (let i = 0; i < users.length; i++) {
    const {
      firstName,
      lastName,
      address,
      city,
      state,
      zipcode,
      username,
      password,
      email,
      moneyNum,
      userImageUrl,
      favoriteProduct,
    } = users[i];
    await prisma.users.create({
      data: {
        firstName,
        lastName,
        address,
        city,
        state,
        zipcode,
        username,
        password,
        email,
        moneyNum,
        userImageUrl,
        favoriteProduct,
      },
    });
  }
  console.log("Creating Inital Product Data...");
  for (let i = 0; i < products.length; i++) {
    const {
      name,
      category,
      price,
      inStock,
      quantity,
      imageUrl,
      rating,
      description,
    } = products[i];
    await prisma.products.create({
      data: {
        name,
        category,
        price,
        inStock,
        quantity,
        imageUrl,
        rating,
        description,
      },
    });
  }
}

makeInitialData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
  });
