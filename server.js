const express = require("express");
const routes = require("./routes");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ message: "404 error! Not found!" });
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
