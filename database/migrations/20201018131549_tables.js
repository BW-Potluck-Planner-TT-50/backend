exports.up = function (knex) {
  return knex.schema
    .createTable("Users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).unique().notNullable().index();
      tbl.string("password", 256).notNullable();
    })
    .createTable("Events", (tbl) => {
      tbl.increments();
      tbl.string("event_name").notNullable();
      tbl.date("date").notNullable();
      tbl.string("time").notNullable();
      tbl.string("location").notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .references("Users.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl.string("invite_code").notNullable().unique();
    })
    .createTable("Food", (tbl) => {
      tbl.increments();
      tbl.string("food_name").notNullable().unique().index();
    })
    .createTable("Guests", (tbl) => {
        tbl.increments();
        tbl.string("name", 128).unique().notNullable().index();
        tbl.boolean("RSVP").defaultTo(false);
        tbl
          .string("event_id")
          .unsigned()
          .references("Events.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
    .createTable("EventFood", (tbl) => {
      tbl.increments();
      tbl
        .integer("food_id")
        .unsigned()
        .references("Food.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("event_id")
        .unsigned()
        .references("Events.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("guest_id")
        .unsigned()
        .references("Guests.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("EventFood")
    .dropTableIfExists("Guests")
    .dropTableIfExists("Food")
    .dropTableIfExists("Events")
    .dropTableIfExists("Users");
};
