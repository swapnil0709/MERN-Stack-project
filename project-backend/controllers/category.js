const category = require("../models/category");
const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, foundCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = foundCategory;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);

  category.save((err, savedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Error Saving Category",
      });
    }
    res.json({ savedCategory });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, foundCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Error Category not found!!",
      });
    }
    res.json(foundCategory);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updateCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Error updating the Category!!",
      });
    }
    res.json(updateCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  if (category) {
    category.remove((err, removedCategory) => {
      if (err || !removedCategory) {
        return res.status(400).json({
          error: `Error updating the ${removedCategory.name}!!`,
        });
      }
      res.json({
        message: `Successfully deleted ${removedCategory.name}`,
      });
    });
  } else {
    res.status(400).json({
      error: `Deleted category not found`,
    });
  }
};
