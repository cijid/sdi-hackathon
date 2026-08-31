const express = require("express");

const app = express();
const port = 8081;
const cors = require("cors");
app.use(cors());

app.use(express.json());
const knex = require("knex")(require("../knexfile.js")["development"]);

app.get("/", async (req, res) => {
  res.send(`Hello User! I've received a ${req.method} request.`);
});

app.get("/reports", (req, res) => {
  knex("reports")
    .select("*")
    .then((reports) => {
      res.status(200).json(reports);
    });
});

app.post("/reports", async (req, res) => {
  try {
    const [report] = await knex("reports").insert(req.body).returning("*");
    res.status(201).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Could not create report",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
