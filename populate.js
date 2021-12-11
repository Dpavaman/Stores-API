const connectDB = require("./db/connect");
const Product = require("./models/products");
require("dotenv").config();
const products = [
  {
    name: "accent chair",
    price: 25,
    company: "godrej",
    rating: 4,
  },
  {
    name: "albany sectional",
    price: 109,
    company: "zuari",
    rating: 5,
  },
  {
    name: "albany table",
    price: 309,
    company: "zuari",
    rating: 4.9,
  },
  {
    name: "armchair",
    price: 125,
    company: "godrej",
    rating: 4.8,
  },
  {
    name: "bar stool",
    price: 40,
    company: "zuari",
    rating: 4.6,
  },
  {
    name: "dining table",
    price: 42,
    company: "durian",
    rating: 4.55,
  },
  {
    name: "emperor bed",
    price: 23,
    company: "durian",
  },
  {
    name: "entertainment center",
    price: 59,
    featured: true,
    company: "damro",
  },
  {
    name: "high-back bench",
    price: 39,
    featured: true,
    company: "durian",
  },

  {
    name: "leather sofa",
    price: 99,
    company: "damro",
  },
  {
    name: "modern bookshelf",
    price: 31,
    featured: true,
    company: "damro",
  },
  {
    name: "modern poster",
    price: 30,
    company: "zuari",
  },
  {
    name: "shelf",
    price: 30,
    company: "durian",
  },
  {
    name: "simple chair",
    price: 109,
    company: "zuari",
  },
  {
    name: "sofa set",
    price: 129,
    company: "godrej",
  },
  {
    name: "suede armchair",
    price: 15,
    company: "damro",
  },
  {
    name: "utopia sofa",
    price: 79,
    featured: true,
    company: "zuari",
  },
  {
    name: "vase table",
    price: 120,
    featured: true,
    company: "godrej",
  },
  {
    name: "wooden bed",
    price: 25,
    company: "durian",
  },
  {
    name: "wooden desk",
    price: 15,
    company: "durian",
  },
  {
    name: "wooden desk",
    price: 40,
    company: "durian",
  },
  {
    name: "wooden table",
    price: 23,
    featured: true,
    company: "damro",
  },
  {
    name: "a first wooden table",
    price: 23,
    featured: true,
    company: "damro",
  },
];

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(products);
    console.log("Success!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populate();
