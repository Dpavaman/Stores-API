const Products = require("../models/products");

const getAllProductsStatic = async (req, res) => {
  const products = await Products.find();
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const {
    featured,
    company,
    name,
    rating,
    price,
    sort,
    fields,
    numericFilter,
  } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObj.company = { $regex: company, $options: "i" };
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  if (rating) {
    queryObj.rating = rating;
  }
  if (price) {
    queryObj.price = price;
  }

  if (numericFilter) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regex = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilter.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: parseInt(value) };
      }
    });
  }

  let result = Products.find(queryObj);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = filter.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  result = result.limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
