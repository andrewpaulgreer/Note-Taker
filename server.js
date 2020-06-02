const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3030; // saved to new port
const app = express();
let db = require("./db/db.json");
app.use(express.json());
// using app.use  for granting access to req.body
app.use(express.urlencoded({ extended: true }));

// using app.use for recognizing all of the files in the public folder, mainly for CSS
app.use(express.static("public"));


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
// app.post to create saved notes, and allow them to show up on the aside
//sending user data to server
const seeDb = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json"), (err, data) => {
  if (err) throw err;
}));

const addNewNote = (note) => {
  fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(note),(err, data) => {
    if (err) throw err;
  })
};

app.post("/api/notes", function (req, res) {
  let note = req.body;
  let id = seeDb.length;
  note.id = id + 1
  seeDb.push(note);
  addNewNote(seeDb);
  res.json(seeDb);
});

//setting delete, with id placeholder
app.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id;
  let x = 1;
  delete seeDb[id - 1];
  addNewNote(seeDb);
  res.send(addNewNote);

});

// setting a listen
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
