import React from "react";

const Home = () => {
  return (
    <div className="p-4 bg-light rounded shadow-sm">
      <h2 className="text-primary text-center">Home Page - Exp 5.2</h2>
      <p className="lead">
        Welcome to the Home page. This application demonstrates{" "}
        <strong>Route-Based Lazy Loading</strong>.
      </p>
      <p>
        In route-based lazy loading, code for a specific route is only
        downloaded when the user navigates to it.
      </p>
    </div>
  );
};

export default Home;
