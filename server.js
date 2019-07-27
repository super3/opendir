const fs = require("fs").promises;
const express = require("express");
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(path.resolve("./assets")));
app.use(express.static(path.resolve("./content")));

app.get('/', (req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

app.get('/directories', async (req, res) => {
  const contentDir = await fs.readdir("./content");
  let directories = contentDir.map(async dir => {
    const stats = await fs.lstat(path.resolve("./content", dir));
    if (stats.isFile()) {
      return (dir);
    }
    return `/${dir}`;
  });

  directories = await Promise.all(directories);

  res.send(directories);
});

app.listen(port, () => {
  console.log("Server running on port " + port + "...");
});
