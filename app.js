require("dotenv").config();

const express = require("express");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    '<h1>Stores API</h1><a href="/api/v1/products" > Products route  </a>'
  );
});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const initialise = async () => {
  try {
    //connect DB;
    app.listen(port, console.log(`Server is up and listening at Port ${port}`));
  } catch (error) {}
};
initialise();
