exports.seed = function(knex, Promise) {
  return knex('Food').insert([
    { food_name: 'Moms Spaghetti' },
  ]);
};
