exports.seed = function (knex, Promise) {
  return knex("guests").insert([
    { name: "50_Cent", rsvp: true, event_id: 1 },
  ])
}
