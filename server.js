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
// Return index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
//API routes
app.get("/api/notes", (req, res) => {

});
app.post("/api/notes", (req, res) => {

});
app.delete("/api/notes/:id", (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});