exports.up = function (knex) {
  return knex.schema
    .createTable("Users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).unique().notNullable().index();
      tbl.string("password", 256).notNullable();
    })
    .createTable("Events", (tbl) => {
      tbl.increments();
      tbl.string("event_name").notNullable().unique();
      tbl
        .integer("user_id")
        .unsigned()
        .references("Users.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("Attendees", (tbl) => {
      tbl.increments();
      tbl.string("attendee_name").notNullable().unique();
      tbl
        .integer("event_id")
        .unsigned()
        .references("Events.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("Food", (tbl) => {
      tbl.increments();
      tbl.string("food_name").notNullable().unique().index();
    })
    .createTable("EventFood", (tbl) => {
      tbl.increments();
      tbl.string("food_name").notNullable().unique();
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
        .integer("attendee_id")
        .unsigned()
        .references("Attendees.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("EventFood")
    .dropTableIfExists("Food")
    .dropTableIfExists("Attendees")
    .dropTableIfExists("Events")
    .dropTableIfExists("Users");
};
