const shortid = require("shortid");

const inviteCode = shortid.generate()

exports.seed = function(knex, Promise) {
  return knex('events').insert([
    { event_name: `Dr. Dre's Birthday`, date: '2020/11/30', time: `4:00PM`, location: `Danielle's House, Los Angeles, CA`, user_id: 1, invite_code: `${inviteCode}` },
  ]);
};
