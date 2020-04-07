const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML routes

// Return notes.html file
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//API routes

// Return Database Json
app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        return res.json(JSON.parse(data));
    });
});
let id=3;
// Post new note to Database Json
app.post("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        req.body.id= id++;
        notes.push(req.body);
        console.log(notes);
        notes = JSON.stringify(notes, null, "\t");
        fs.writeFile("db/db.json", notes, function (err, data) {
            if (err) throw err;
            // return res.json(data);
        })
    })
});
app.delete("/api/notes/:id", (req, res) => {

})
// Return index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});