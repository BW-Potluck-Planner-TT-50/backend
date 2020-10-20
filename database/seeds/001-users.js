
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { username: 'slimShady', password: 'password123' },
  ]);
};
