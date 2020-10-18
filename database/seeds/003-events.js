exports.seed = function(knex, Promise) {
  return knex('Events').insert([
    { event_name: `Dr. Dre's Birthday`, user_id: 1 },
  ]);
};
