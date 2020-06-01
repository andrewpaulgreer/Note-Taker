const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
// write server code to create paths

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(fs.readFileSync("db/db.json"));
});

// setting a listen
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
