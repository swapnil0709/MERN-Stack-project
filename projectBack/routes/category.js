const express = require("express");
const router = express.Router();

//* Imports

const { getUserById } = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");

//*Parameters
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//* Category Routes

//* POST Route

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//*READ Route
router.get("/category/:categoryId", getCategory);
router.get("/categories/", getAllCategory);

//*UPDATE Route
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//*DELETE Route
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);
module.exports = router;
