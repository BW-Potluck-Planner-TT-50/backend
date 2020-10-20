exports.seed = function(knex, Promise) {
  return knex('eventFood').insert([
    { food_id: 1, event_id: 1, guest_id: 1 },
  ]);
};
