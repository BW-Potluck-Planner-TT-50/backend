
exports.seed = function(knex, Promise) {
  return knex('Users').insert([
    { username: 'slimShady', password: 'password123' },
  ]);
};
