//imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

//constants
const app = express();
const Port = process.env.PORT || 8000;

//MiddleWares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

//Server start
app.listen(Port, () => {
  console.log(`App is running at port ${Port}`);
});

//MongoDB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`MONGOOSE DB IS CONNECTED!!!!!`);
  });
