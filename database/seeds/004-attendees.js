exports.seed = function(knex, Promise) {
  return knex('Attendees').insert([
    { attendee_name: `50_Cent`, event_id: 1 },
  ]);
};
