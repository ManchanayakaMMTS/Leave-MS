const router = require("express").Router();
const Leave = require("../models/Leave");

// Add a Leave
router.route("/leave/add").post((req, res) => {
  const employeeNumber = req.body.userID;
  const reason = req.body.reason;
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const status = req.body.status;
  const comments = req.body.comments;
  

  const newLeave = new Leave({
    employeeNumber,
    reason,
    startDate,
    endDate,
    status,
    comments
  });

  newLeave.save()
    .then(() => {
      res.json("Leave added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to add Leave" });
    });
});

// Retrieve All Leaves
router.route("/leave/").get((req, res) => {
  Leave.find()
    .then((leaves) => {
      res.json(leaves);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to retrieve Leaves" });
    });
});

// Update a Leave by ID
router.route("/leave/update/:id").put(async (req, res) => {
  const leaveID = req.params.id;
  const { employeeNumber, reason, startDate, endDate, status, comments } = req.body;

  const updateLeave = {
    employeeNumber,
    reason,
    startDate,
    endDate,
    status,
    comments
  };

  try {
    const updatedLeave = await Leave.findByIdAndUpdate(leaveID, updateLeave);
    res.status(200).json({ status: "Leave updated", leave: updatedLeave });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update Leave" });
  }
});

// Delete a Leave by ID
router.route("/leave/delete/:id").delete(async (req, res) => {
  const leaveID = req.params.id;

  try {
    await Leave.findByIdAndDelete(leaveID);
    res.status(200).json({ status: "Leave deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to delete Leave", errorMessage: err.message });
  }
});

// Get a Leave by ID
router.route("/leave/get/:id").get(async (req, res) => {
  const leaveID = req.params.id;

  try {
    const leave = await Leave.findById(leaveID);
    res.status(200).json({ status: "Leave fetched", leave: leave });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to get Leave", errorMessage: err.message });
  }
});

module.exports = router;
