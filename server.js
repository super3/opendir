const fs = require("fs");
const express = require("express");
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(path.resolve("./assets")));
app.use(express.static(path.resolve("./content")));

app.get('/', (req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

app.get('/directories', (req, res) => {
  const contentDir = fs.readdirSync("./content");
  res.send(contentDir);
});

app.listen(port, () => {
  console.log("Server running on port " + port + "...");
});
