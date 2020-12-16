const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, foundOrder) => {
      if (err) {
        return res.status(400).json({ error: "No order found" });
      }
      req.order = foundOrder;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);

  order.save((err, savedOrder) => {
    if (err) {
      return res.status(400).json({ error: "Failed to save order to db" });
    }
    res.json(savedOrder);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, foundOrders) => {
      if (err) {
        return res.status(400).json({ error: "Failed find any orders" });
      }
      res.json(foundOrders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    {
      _id: req.body.orderId,
    },
    { $set: { status: req.body.status } },
    (err, updatedOrder) => {
      if (err) {
        return res.status(400).json({ error: "Failed to update Order status" });
      }
      res.json(updatedOrder);
    }
  );
};
