const pgConnection = process.env.DATABASE_URL || "postgres://ldpnmfwcednyuf:9c4e0176fe9cf3e5828db9953062a0ffb8394c6db23a19897af8eb6d9bee22eb@ec2-18-214-119-135.compute-1.amazonaws.com:5432/dc6lidina0ui1g"

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
