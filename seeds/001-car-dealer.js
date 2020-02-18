
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('car-dealer')
    .truncate()
    .then(function () {
      const cars = [
        {
          VIN: '204FGJSL',
          make: 'Toyota',
          model: 'Camry',
          milage: '10,000'
        },
        {
          VIN: '199FSDFL',
          make: 'Honda',
          model: 'Accord',
          milage: '13,549',
          titleStatus: 'salvaged'
        }
      ]
      return knex('car-dealer').insert(cars);
    });
};
