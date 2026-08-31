const express = require("express");

const app = express();
const port = 8081;
const cors = require("cors");
app.use(cors());

app.use(express.json());
const knex = require("knex")(require("../knexfile.js")["development"]);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
