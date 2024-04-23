import React, { useState } from "react";

function UserHome() {
  const [newLeave, setNewLeave] = useState({
    employeeNumber: "",
    reason: "",
    startDate: "",
    endDate: "",
    comments: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLeave({
      ...newLeave,
      [name]: value,
    });
  };

  const addLeave = () => {
    // Send a POST request to add a new leave for the current user.
    fetch("http://localhost:8070/leave/leave/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLeave),
    })
      .then((response) => response.json())
      .then(() => {
        setNewLeave({
          employeeNumber: "",
          reason: "",
          startDate: "",
          endDate: "",
          comments: "",
        });
      })
      .catch((error) => console.error("Error adding leave: " + error));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add New Leave</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="employeeNumber"
                value={newLeave.employeeNumber}
                onChange={handleInputChange}
                placeholder="Employee ID"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="reason"
                value={newLeave.reason}
                onChange={handleInputChange}
                placeholder="Reason"
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={newLeave.startDate}
                onChange={handleInputChange}
                placeholder="Start Date"
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={newLeave.endDate}
                onChange={handleInputChange}
                placeholder="End Date"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="comments"
                value={newLeave.comments}
                onChange={handleInputChange}
                placeholder="Comments"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addLeave}
            >
              Add Leave
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
