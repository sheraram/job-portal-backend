const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");

// MongoDB
// mongodb+srv://guesser9877:<password>@cluster0.ucm3oce.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://guesser9877:<password>@cluster0.o5sa2n8.mongodb.net/?retryWrites=true&w=majority
mongoose
// .connect("mongodb://localhost:27017/jobPortal", { //  for local Mongo
  // .connect("mongodb+srv://guesser9877:18099483@cluster0.ucm3oce.mongodb.net/jobPortal", { // for mongo atlas
  .connect("mongodb+srv://guesser9877:18099483@cluster0.o5sa2n8.mongodb.net/?retryWrites=true&w=majority", { // for mongo atlas
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = 4444;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
