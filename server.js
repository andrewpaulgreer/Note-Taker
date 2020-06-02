const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3030; // saved to new port

// using app.use  for granting access to req.body
app.use(express.urlencoded({ extended: true }));

// using app.use for recognizing all of the files in the public folder, mainly for CSS
app.use(express.static("public"));

// handling functionality
//app.get for notes api
app.get("/api/notes", (req, res) => {
  let dbRes = seeDB();
  console.log("api/notesget");
  return res.json(dbRes);
});
// create function so we can see our db.json, and parse that info
const seeDB = () => {
  let dbInfo = fs.readFileSync(__dirname + "/db/db.json");
  let parsedDbInfo = JSON.parse(dbInfo);
  return parsedDbInfo;
};

const createObject = (data) => {
  let object = {
    title: data.title,
    text: data.text,
    // add in for delete
  };
  return object;
};

// write server code to create paths
// get notes htmp from notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// app.get for index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// app.post to create saved notes, and allow them to show up on the aside
//sending user data to server
app.post("/api/notes", (req, res) => {
  const saveData = (json) => {
    let notes = JSON.stringify(json);
    fs.writeFileSync(__dirname + "/db/db.json", notes);
  };

  const addNewNote = (data) => {
    let newData = seeDB();
    let newNote = createObject(data);
    newData.push(newNote);
    saveData(newData);
  };

  console.log(req.body);
  addNewNote(req.body);
  res.json(seeDB());
});

//setting delete, with id placeholder
app.delete("/api/notes/:id", (req, res) => {
  const deleteNote = (id) => {};
});

// setting a listen
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
