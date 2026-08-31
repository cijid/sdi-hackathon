/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("reports", (table) => {
    table.increments("id").primary();
    table.string("first_name", 100).notNullable();
    table.string("last_name", 100);
    table.string("user_grade_and_rank", 100);
    table.integer("report_lat");
    table.integer("report_long");
    table.string("syscap_status_code", 250);
    table.string("response_actions", 250);
    table.string("comments", 250);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("reports");
};
