exports.seed = function(knex, Promise) {
  return knex('Food').insert([
    { food_name: 'Spaghetti' },
    { food_name: 'Chicken Pot Pie' },
    { food_name: 'Fruit Salad' },
    { food_name: 'Banana Cream Pie' },
    { food_name: 'Chicken Wings' },
    { food_name: 'Veggie Platter' },
  ]);
};
