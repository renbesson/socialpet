require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/dbConnection");
const { storage } = require("./config/firebase");
const routes = require("./routes");

// If this is production allow static files to be served from the build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
//Load the stage for our react app, since it is a single page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Social Pet is running on port ${PORT}`);
  });
});
