const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path")

if (process.env.NODE_URL !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// using middleware

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// import routes

const post = require("./routes/Postroute");
const user = require("./routes/Userroute");

app.use("/api/v1", post);
app.use("/api/v1", user);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app;
