const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, foundProduct) => {
      if (err || !foundProduct) {
        return res.status(400).json({
          err: "Product not found",
        });
      }
      req.product = foundProduct;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        Error: "Please include all fields",
      });
    }

    let product = new Product(fields);

    //handle files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to db
    product.save((err, savedProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Failed saving product to db",
        });
      }
      res.json(savedProduct);
    });
  });
};

exports.getProduct = (req, res) => {
  //currently removing the photo from loading
  req.product.photo = undefined;
  return res.json(req.product);
};

//middleware for faster photo rendering in background
exports.photoLoadInBackground = (req, res, next) => {
  if (req.photo.data) {
    res.set("Content-Type", req.product.photo.data);
  }

  next();
};

//Delete controller

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        err: `Error Deleting ${deletedProduct}`,
      });
    }
    res.json({
      message: `Product Deleted successfully ${deletedProduct}`,
    });
  });
};

//Update controller

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //Updation code
    let product = req.product;
    product = _.extend(product, fields); //We are using loadash here and extend accepts 2 arguments one is the product from which it will get the required fields,
    // And the other are the new fields values which we will be using to update.

    //handle files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to db
    product.save((err, savedProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Failed updating product!",
        });
      }
      res.json(savedProduct);
    });
  });
};

//getAllProducts controller

exports.getAllProducts = (req, res) => {
  const limit = req.query.limit ? req.query.limit : 8;
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, foundProducts) => {
      if (err) {
        return res.status(400).json({
          error: `Error finding all products`,
        });
      }

      res.json(foundProducts);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, foundCategories) => {
    if (err) {
      return res.status(400).json({
        error: `No unique categories found`,
      });
    }

    res.json(foundCategories);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((eachProduct) => {
    return {
      updateOne: {
        filter: { _id: eachProduct._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, resultProducts) => {
    if (err) {
      return res.status(400).json({
        error: `Bulk Opertion failed`,
      });
    }
    next();
  });
};
