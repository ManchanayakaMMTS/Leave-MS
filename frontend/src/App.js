import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminHome from "./components/AdminHome";
import UserHome from "./components/UserHome";
import LoginPage from "./components/LoginPage";
import Login from "./components/Login";
import UpdateUser from "./components/UpdateUser"; // Import the UpdateUser component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/user" element={<Login />} />
          <Route path="/UserHome" element={<UserHome />} />
          <Route path="/updateUser/:userId" element={<UpdateUser />} /> {/* Route for UpdateUser */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
