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

app.delete('/reports/:id', async (req, res) => {
  const {id} = req.params;

  try {
    await knex.transaction(async (trx) => {
      const entry = await trx('reports')
        .where({ id })
        .first();

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found'});
    }



    await trx('reports')
    .where({id})
    .del();

    await trx('resolved_reports').insert({
    ...entry,
    archived_at: knex.fn.now()
});

    res.status(200).json({ message: 'Entry archived and deleted' });

    });

  } catch (error) {
    console.error('Failed to move entry', error);
    res.status(500).json({ error: 'Error during archive'});
  }



});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
