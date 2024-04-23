import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <h1>Welcome to Your App</h1>
      <Link to="/admin">
        <button>Admin Home</button>
      </Link>
      <Link to="/user">
        <button>User Home</button>
      </Link>
    </div>
  );
}
export default LoginPage;
