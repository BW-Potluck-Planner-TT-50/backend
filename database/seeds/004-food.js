exports.seed = function (knex, Promise) {
  return knex("food").insert([
    { name: "Spaghetti", event_id: 1, guest_id: 1 },
  ])
}
