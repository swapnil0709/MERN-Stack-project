import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripePay from "react-stripe-checkout";
import { API } from "../backend";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().userId;
  const makepayemnt = (token) => {
    //
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        //we can call createOrder and clear cart
        const { status } = response;
        console.log("Status", status);
        cartEmpty();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripePay
        stripeKey="pk_test_51HyXinHqWSpLoncUB662zxgPGwkHz8kUds47p8OYwMilr2tmTBVZkIqhKB749r6LCvSFKvo6bpyG2Spc3AVcg0nZ00Mm1CrAhP"
        token={makepayemnt}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay With Stripe</button>
      </StripePay>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  const getFinalAmount = () => {
    let amount = 0;

    products.map((eachProduct) => {
      amount += eachProduct.price;
    });
    return amount;
  };
  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
