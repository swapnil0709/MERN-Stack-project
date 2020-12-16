import React from "react";
import "../styles.css";
import NavBar from "./NavBar";
const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
  <NavBar/>
    <div className="conatiner-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions feel free to react out</h4>
        <button className="btn btn-warning btn-lg">Contact us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An amazing place for <span className="text-white">shopping</span>{" "}
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
