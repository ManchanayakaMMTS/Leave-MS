import React, { useState, useEffect } from "react";

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    employeeNumber: "",
    fullName: "",
    password: "",
    role: "user",
  });
  const [leaveList, setLeaveList] = useState([]); // State for the leave list

  useEffect(() => {
    // Fetch user data from your API or server
    fetch("http://localhost:8070/user/user/")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user data: " + error));
  }, []);

  // Fetch leave data from your API or server
  useEffect(() => {
    fetch("http://localhost:8070/leave/leave/") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setLeaveList(data))
      .catch((error) => console.error("Error fetching leave data: " + error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const addUser = () => {
    fetch("http://localhost:8070/user/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewUser({
          employeeNumber: "",
          fullName: "",
          password: "",
          role: "user",
        });

        // Refresh the user list after adding a new user
        setUsers([...users, data]);
      })
      .catch((error) => console.error("Error adding user: " + error));
  };

  const deleteUser = (userId) => {
    fetch(`http://localhost:8070/user/user/delete/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // Remove the deleted user from the user list
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((error) => console.error("Error deleting user: " + error));
  };

  const updateUser = (userId) => {
    // Navigate to a page where you can update the user using userId
  };

  return (
    <div>
      <h2>User Details</h2>
      <table>
        <thead>
          <tr>
            <th>Employee Number</th>
            <th>Full Name</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.employeeNumber}</td>
              <td>{user.fullName}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => updateUser(user._id)}>Update</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add New User</h2>
      <div>
        <input
          type="number"
          name="employeeNumber"
          value={newUser.employeeNumber}
          onChange={handleInputChange}
          placeholder="Employee Number"
        />
        <input
          type="text"
          name="fullName"
          value={newUser.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={addUser}>Add User</button>
      </div>

      {/* Leave List */}
      <h2>Leave List</h2>
      <table>
        <thead>
          <tr>
            <th>Reason</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {leaveList.map((leave, index) => (
            <tr key={index}>
              <td>{leave.reason}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminHome;
