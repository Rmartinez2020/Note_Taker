// Dependencies
// ===========================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');





const app = express();
const PORT = process.env.PORT || 3000;

// Set up the Express app to handle data parsing
// ===========================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML Routes
// ===========================================================
// Return notes.html file
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//API Routes
// ===========================================================
// Return Database Json
app.get("/api/notes", (req, res) => {
    // Read the Json file
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        // return the file as a Json object
        return res.json(JSON.parse(data));
    });
});
// Post new note to Database Json
app.post("/api/notes", (req, res) => {
    // Read the Json file then push the new data to the array then rewrite the file with the new data
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);
        //give unique id
        req.body.id= uuidv4();
        notes.push(req.body);
        notes = JSON.stringify(notes, null, "\t");
        fs.writeFile("db/db.json", notes, function (err) {
            if (err) throw err;
            //return the new data
             return res.json(notes);
        })
    })
});
// Delete targeted note and update the page
app.delete("/api/notes/:id", (req, res) => {
    // Get the note ID
    const targetId = req.params.id;
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        //filter out notes with targeted ID
        let filteredNotes = notes.filter(function(value, index, arr){ return value.id != targetId;});
        filteredNotes = JSON.stringify(filteredNotes, null, "\t");
        fs.writeFile("db/db.json", filteredNotes, function (err) {
            if (err) throw err;
            //return the new data
             return res.json(filteredNotes);
        })
        });

    });
// Return index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
// Listener
// ===========================================================
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});