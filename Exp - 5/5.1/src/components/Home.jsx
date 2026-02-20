import React from "react";

const Home = () => {
  return (
    <div className="p-4 bg-light rounded shadow-sm">
      <h2 className="text-primary">Home Page</h2>
      <p className="lead">Welcome to the Home page of Experiment 5.1.</p>
      <p>
        This component is loaded lazily using <code>React.lazy()</code> and{" "}
        <code>Suspense</code>. Lazy loading helps in reducing the initial bundle
        size and improving performance.
      </p>
    </div>
  );
};

export default Home;
