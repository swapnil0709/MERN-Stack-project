import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import getProducts from "./helper/coreapicalls";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    <Base title="Home Page" description="Welcome to t-shirt Store">
      <div className="row text-center">
        <h1 className="text-white">All of t shirts</h1>
        <div className="row">
          {products.map((eachProduct, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={eachProduct} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default Home;
