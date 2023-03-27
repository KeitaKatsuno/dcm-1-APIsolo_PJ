/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("phone_product").del();
  await knex("phone_product").insert([
    {
      id: 1,
      phone_name: "iPhone 13",
      feature: "big",
    },
    {
      id: 2,
      phone_name: "iPhone 13 Pro",
      feature: "more big",
    },
    {
      id: 3,
      phone_name: "iPhone 13 mini",
      feature: "small",
    },
    {
      id: 4,
      phone_name: "Galaxy note 10+",
    },
    {
      id: 5,
      phone_name: "Galaxy Special",
    },
  ]);
};
