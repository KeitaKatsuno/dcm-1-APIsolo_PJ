/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("phone_product", function (table) {
    table.increments("id").primary(); // Set this column as the primary key
    table
      .string("phone_name", 32)
      .unique() // This is a constraint that prevents duplicate emails in the table
      .notNullable()
      .index(); // Adding an index makes searching by email faster
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("phone_product");
};
