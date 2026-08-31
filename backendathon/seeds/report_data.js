/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("reports").del();
  await knex("reports").insert([
    {
      id: 1,
      first_name: "Clifford",
      last_name: "Drew",
      user_grade_and_rank: "E-6/TSgt",
      report_lat: "10",
      report_long: "10",
      syscap_status_code: "Degraded",
      response_actions: "Enacting PACE plan",
      comments: "Radios are scuffed",
    },
    {
      id: 2,
      first_name: "John",
      last_name: "Snuffy",
      user_grade_and_rank: "E-5/Sgt",
      report_lat: "20",
      report_long: "50",
      syscap_status_code: "Available",
      response_actions: "N/A",
      comments: "Radio check - 5 by 5",
    },
    {
      id: 3,
      first_name: "Jim",
      last_name: "Jarnathan",
      user_grade_and_rank: "O-3/Cpt",
      report_lat: "25",
      report_long: "36",
      syscap_status_code: "Unavailable",
      response_actions: "Enacting PACE plan",
      comments:
        "Unable to connect to primary connection. Switched to shouting really loud.",
    },
  ]);
};
