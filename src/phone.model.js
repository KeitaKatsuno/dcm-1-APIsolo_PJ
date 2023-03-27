const knex = require("./knex");

const PHONE_TABLE = "phone_product";

module.exports = {
  PHONE_TABLE,

  /**
   * @param {number} id - The max number of customers to return.
   * @return {Promise<Array>} A promise that resolves to an array of customers.
   */
  getAll() {
    return knex.select("*").from(PHONE_TABLE);
  },

  getOne(id) {
    return knex.select("*").from(PHONE_TABLE).where({ id: id });
  },

  /**
   * @param {Object} phone - The new customer data to add.
   * @return {Promise<number>} A promise that resolves to the id of created customer.
   */
  addPhone(phone) {
    return knex
      .insert({
        phone_name: phone.phone_name,
        feature: phone.feature,
      })
      .into(PHONE_TABLE)
      .returning("id")
      .then((result) => result[0].id);
  },

  /**
   * @param {Object} phone - The new customer data to add.
   * @return {Promise<number>} A promise that resolves to the id of created customer.
   */
  updatePhone(phone) {
    return knex(PHONE_TABLE)
      .where({ id: phone.id })
      .update({
        phone_name: phone.phone_name,
        feature: phone.feature,
      })
      .returning("id")
      .then((result) => result[0].id);
  },

  /**
   * @param {Object} phone - The new customer data to add.
   * @return {Promise<number>} A promise that resolves to the id of created customer.
   */
  deletePhone(phone) {
    return knex(PHONE_TABLE)
      .where({ id: phone.id })
      .delete()
      .returning("id")
      .then((result) => result[0].id);
  },
};
