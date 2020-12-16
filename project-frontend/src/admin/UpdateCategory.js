import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getCategory,
  getCategories,
  updateCategory,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
const UpdateCategory = ({ match }) => {
  const [values, setValues] = useState({
    name: "",

    loading: false,
    error: "",
    createdCategory: "",
    getARedirect: false,
    formData: "",
  });
  const { user, token } = isAuthenticated();
  const {
    name,
    loading,
    error,
    createdCategory,
    getARedirect,
    formData,
  } = values;

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,

          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard/">
          Admin Home
        </Link>
      </div>
    );
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateCategory(match.params.categoryId, user._id, token, formData)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            loading: false,
            
          });
        }
      })
      .catch();
  };
  const handleChange = (name) => (event) => {

    const value = event.target.value;
    console.log("You Type",value);
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdCategory ? "" : "none" }}
      >
        <h4>{createdCategory} updated Successfully</h4>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4> Error Failed to update Category</h4>
      </div>
    );
  };
  const createCategoryForm = () => (
    <form>
      <span>Category Name</span>

      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Category
      </button>
    </form>
  );
  return (
    <Base
      title="Update Category"
      className="container bg-success p-4"
      description="Update Your Category Here!!!"
    >
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createCategoryForm()}
        </div>
      </div>
      {goBack()}
    </Base>
  );
};

export default UpdateCategory;
