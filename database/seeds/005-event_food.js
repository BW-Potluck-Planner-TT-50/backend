exports.seed = function(knex, Promise) {
  return knex('EventFood').insert([
    { food_id: 1, event_id: 1, guest_id: 1 },
  ]);
};
