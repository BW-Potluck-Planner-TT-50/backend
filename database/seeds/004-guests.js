exports.seed = function(knex, Promise) {
  return knex('Guests').insert([
    { name: `50_Cent`, RSVP: true, event_id: 1 },
  ]);
};
