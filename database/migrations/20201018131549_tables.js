exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).unique().notNullable().index();
      tbl.string("password", 256).notNullable();
    })
    .createTable("events", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.date("date").notNullable();
      tbl.string("time").notNullable();
      tbl.string("location").notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl.string("invite_code").notNullable().unique();
    })
    .createTable("guests", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).unique().notNullable().index();
      tbl.boolean("rsvp").defaultTo(false);
      tbl
        .integer("event_id")
        .unsigned()
        .references("events.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("food", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable().unique().index();
      tbl
        .integer("event_id")
        .unsigned()
        .references("events.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("guest_id")
        .unsigned()
        .references("guests.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("eventFood")
    .dropTableIfExists("guests")
    .dropTableIfExists("food")
    .dropTableIfExists("events")
    .dropTableIfExists("users");
};
