const router = require("express").Router();
const User = require("../models/User");

// Register a User
router.route("/user/register").post((req, res) => {
  const employeeNumber = req.body.employeeNumber;
  const fullName = req.body.fullName;
  const password = req.body.password;
  const role = req.body.role || 'user'; // Default to 'user' if not provided

  const newUser = new User({
    employeeNumber,
    fullName,
    password,
    role
  });

  newUser.save()
    .then(() => {
      res.json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to register User" });
    });
});

// Retrieve All Users
router.route("/user/").get((req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to retrieve Users" });
    });
});

// Update a User by ID
router.route("/user/update/:id").put(async (req, res) => {
  const userID = req.params.id;
  const { employeeNumber, fullName, password, role } = req.body;

  const updateUser = {
    employeeNumber,
    fullName,
    password,
    role
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(userID, updateUser);
    res.status(200).json({ status: "User updated", user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update User" });
  }
});

// Delete a User by ID
router.route("/user/delete/:id").delete(async (req, res) => {
  const userID = req.params.id;

  try {
    await User.findByIdAndDelete(userID);
    res.status(200).json({ status: "User deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to delete User", errorMessage: err.message });
  }
});

// Get a User by ID
router.route("/user/get/:id").get(async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await User.findById(userID);
    res.status(200).json({ status: "User fetched", user: user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to get User", errorMessage: err.message });
  }
});

module.exports = router;
