/*eslint-disable*/

exports.up = function (knex, Promise) {
  return knex.schema.createTable('Passage', function (t) {
    t.increments('ID').unsigned().primary(),
    t.string('Language'),
    t.string('Tpoic'),
    t.decimal('Payment'),
    t.boolean('Leftparagraph')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('Passage')
}
