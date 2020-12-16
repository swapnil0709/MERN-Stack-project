import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "../src/admin/AddCategory";
import ManageCategory from "./admin/ManageCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";

function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/cart" exact component={Cart} />
          <PrivateRoutes
            path="/user/dashboard"
            exact
            component={UserDashBoard}
          />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashBoard}
          />
          <AdminRoute
            path="/admin/create/category"
            exact
            component={AddCategory}
          />
          <AdminRoute
            path="/admin/categories"
            exact
            component={ManageCategory}
          />
          <AdminRoute
            path="/admin/category/update/:categoryId"
            exact
            component={UpdateCategory}
          />
          <AdminRoute
            path="/admin/create/product"
            exact
            component={AddProduct}
          />
          <AdminRoute path="/admin/products" exact component={ManageProducts} />
          <AdminRoute
            path="/admin/product/update/:productId"
            exact
            component={UpdateProduct}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routes;
