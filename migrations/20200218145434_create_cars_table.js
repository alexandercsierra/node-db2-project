exports.up = function(knex) {
    return knex.schema.createTable('car-dealer', tbl=>{
        tbl.increments();
        tbl.string('VIN').notNullable().index();
        tbl.string('make').notNullable().index();
        tbl.string('model').notNullable().index();
        tbl.string('milage').notNullable();
  
        //optional
        tbl.string('transmissionType');
        tbl.string('titleStatus');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
  };
  