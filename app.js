require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
const productsRouter = require("./routes/products");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    '<h1>Stores API</h1><a href="/api/v1/products" > Products route  </a>'
  );
});

app.use("/api/v1/products", productsRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const initialise = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is up and listening at Port ${port}`));
  } catch (error) {}
};
initialise();
