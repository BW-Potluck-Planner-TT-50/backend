const pgConnection = process.env.DATABASE_URL || "postgres://jqklfjghgonzws:6120ebd1e6e5020175e76cad5f24fb227e213aa1b55e42baa5f703c5f075942e@ec2-3-220-98-137.compute-1.amazonaws.com:5432/dc29sg6ilieomc"

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/events.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
}
