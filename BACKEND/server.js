const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

console.log('MONGODB_URL:', URL);

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Success!");
});

const leaveRouter = require("./routes/leaves.js");

app.use("/leave", leaveRouter);

const userRouter = require("./routes/users.js");

app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
