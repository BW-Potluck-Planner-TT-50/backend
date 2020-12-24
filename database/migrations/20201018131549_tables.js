exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments()
      tbl.string("email", 155).notNullable().unique()
      tbl.string("username", 128).notNullable()
      tbl.string("password", 256).notNullable()
    })
    .createTable("events", (tbl) => {
      tbl.increments()
      tbl.string("name").notNullable()
      tbl.date("date").notNullable()
      tbl.string("time").notNullable()
      tbl.string("location").notNullable()
      tbl
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
    })
    .createTable("guests", (tbl) => {
      tbl.increments()
      tbl.string("email", 128).notNullable()
      tbl.boolean("rsvp").defaultTo(false)
      tbl
        .integer("event_id")
        .unsigned()
        .references("events.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
      tbl.string("invite_code").notNullable().unique()
      tbl.string("food")
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("guests")
    .dropTableIfExists("events")
    .dropTableIfExists("users")
}
