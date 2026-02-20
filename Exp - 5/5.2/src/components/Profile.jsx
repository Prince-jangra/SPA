import React from "react";

const Profile = () => {
  return (
    <div className="p-4 bg-light border border-success rounded shadow-sm">
      <h2 className="text-success">Profile Component</h2>
      <p className="lead">
        This is the Profile page, also loaded lazily.
      </p>
      <p>
        React's <code>Suspense</code> component handles the loading state as the chunk is downloaded.
      </p>
    </div>
  );
};

export default Profile;
