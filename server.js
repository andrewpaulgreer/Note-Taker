const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT ||; // saved to new port
const app = express();
let db = require("./db/db.json");
app.use(express.json());
// using app.use  for granting access to req.body
app.use(express.urlencoded({ extended: true }));

// using app.use for recognizing all of the files in the public folder, mainly for CSS
app.use(express.static("public"));

// get index.js, possibly redundent due to static public, wanted to be sure this was added
app.get("/assets/js/index.js"), function (req, res){
  res.sendFile(path.join(__dirname, "public/assets/js/index.js"))
}

// write server code to create paths
// get notes http from notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// handling functionality
//app.get for notes api
app.get("/api/notes", function (req, res) {
 return res.json(seeDb);
});

// app.get for index.html
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// let seeDb so we can manipulate later on with ID's, just making this a convenience variable
let seeDb = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json"), (err, data) => {
  if (err) {
    throw err;
  }
}));

// function for writing using writefilesync
const writeNewNote = function(note) {
  fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(note),(err, data) => {
    if (err) {
      throw err;
    }
  })
};

// creating post method
app.post("/api/notes", function(req, res) {
  let note = req.body;
  let id = seeDb.length;
  note.id = id
  seeDb.push(note);
  //writing the new note to the DB
  writeNewNote(seeDb);
  res.json(seeDb);
});

// setting delete, with id placeholder
app.delete("/api/notes/:id", function (req, res){
  let parsedId = req.params.id;
  let newId = 0;
  //using filter method to add to seeDb if the id's do not match a previousely placed.
  seeDb = seeDb.filter((newly) => { return newly.id != parsedId })
  //creating a for of loop using the previous seeDb convenience variable, and newly
  for (newly of seeDb){
    newly.id = newId.toString();
    newId ++;
  }
  //adding the new note to the Db
  writeNewNote(seeDb);
  res.json(seeDb);
});

// setting app.listen to port
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
