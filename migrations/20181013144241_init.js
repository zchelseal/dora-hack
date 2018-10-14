/*eslint-disable*/

exports.up = function (knex, Promise) {
  return knex.schema.createTable('Passage', function (t) {
    t.increments('ID').unsigned().primary(),
    t.string('Fromlanguage'),
    t.string('Tolanguage'),
    t.string('Topic'),
    t.decimal('Payment')
  })
  .createTable('Paragraph', function (t) {
    t.integer('ID').references('Passage.ID')
  })

}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('Passage')
}
