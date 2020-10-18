exports.seed = function(knex, Promise) {
  return knex('EventFood').insert([
    { food_name: `Moms Spaghetti`, event_id: 1, food_id: 1 },
  ]);
};
