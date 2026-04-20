import React from "react";

const About = () => {
  return (
    <div className="p-4 bg-light rounded shadow-sm">
      <h2 className="text-info">About Page</h2>
      <p className="lead">This is the About page of Experiment 5.1.</p>
      <p>
        React <code>Suspense</code> allows us to show a fallback UI while this
        component is loading.
      </p>
    </div>
  );
};

export default About;
