import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteProduct, getCategories } from "./helper/adminapicall";

const ManageCategory = () => {
  const [category, setCategory] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategory(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  // const removeCategory = (categoryId) => {
  //   deleteCategory(categoryId, user._id, token).then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       preload();
  //     }
  //   });
  // };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total categories</h2>

          {category.map((eachCategory, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{eachCategory.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${eachCategory._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  {/* <button
                    onClick={() => {
                      removeProduct(eachCategory._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategory;
