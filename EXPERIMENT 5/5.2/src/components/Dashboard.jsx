import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4 bg-light border border-info rounded shadow-sm">
      <h2 className="text-info">Dashboard Component</h2>
      <p className="lead">This is the Dashboard page, loaded lazily.</p>
      <p>
        Observe the "Network" tab in your browser's developer tools as you
        switch to this route for the first time.
      </p>
    </div>
  );
};

export default Dashboard;
