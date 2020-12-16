const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photoLoadInBackground,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// Params

router.param("userId", getUserById);
router.param("productId", getProductById);

// create Route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//Read Routes

router.get("/product/:productId", getProduct);

//Middleware to load photo in background
router.get("/product/photo/:productId", photoLoadInBackground);

//Update Route

router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//Delete Route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);
//listing Route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);
module.exports = router;
