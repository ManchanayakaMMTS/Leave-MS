import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdateUser() {
  const { userId } = useParams(); // Get the user ID from the URL parameters
  const [user, setUser] = useState({
    employeeNumber: "",
    fullName: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    // Fetch user data for the specified user ID
    fetch(`http://localhost:8070/user/user/get/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => console.error("Error fetching user data: " + error));
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const updateUser = () => {
    // Send a PUT request to update the user with the specified user ID
    fetch(`http://localhost:8070/user/user/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the updated user data if needed
      })
      .catch((error) => console.error("Error updating user: " + error));
  };

  return (
    <div>
      <h2>Update User</h2>
      <div>
        <input
          type="number"
          name="employeeNumber"
          value={user.employeeNumber}
          onChange={handleInputChange}
          placeholder="Employee Number"
        />
        <input
          type="text"
          name="fullName"
          value={user.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <select name="role" value={user.role} onChange={handleInputChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={updateUser}>Update User</button>
      </div>
    </div>
  );
}

export default UpdateUser;
