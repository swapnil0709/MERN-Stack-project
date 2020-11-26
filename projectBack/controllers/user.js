const User = require("../models/user");
const Order = require("../models/order");


exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, foundUser) => {
    if (err || !foundUser) {
      return res.status(400).json({
        error: "User was not found in the database",
      });
    }

    req.profile = foundUser;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, foundUser) => {
      if (err || !foundUser) {
        return res.status(400).json({
          err: "cannot update user data",
        });
      }
      foundUser.salt = undefined;
      foundUser.encry_password = undefined;
      foundUser.createdAt = undefined;
      foundUser.updatedAt = undefined;
      res.json(foundUser);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, foundOrder) => {
      if (err) {
        return res.status(400).json({
          error: "Order not found",
        });
      }
      res.json(foundOrder);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });
  //*store into DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, foundPurchases) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to save purchases to DB",
        });
      }
      next();
    }
  );
};
