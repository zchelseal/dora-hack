/*eslint-disable*/

exports.up = function (knex, Promise) {
  return knex.schema.createTable('Passage', function (t) {
    t.increments('ID').unsigned().primary(),
    t.string('FromLanguage'),
    t.string('ToLanguage'),
    t.decimal('Payment'),
    t.string('Snippet'),
    t.boolean('AllTranslated'),
    t.boolean('Reviewed')
  })
  .createTable('Paragraph', function (t) {
    t.integer('PassageID').references('Passage.ID'),
    t.integer('ParagraphIndex'),
    t.string('OriginalText', 1000),
    t.string('TranslatedText', 1000),
    t.boolean('Assigned'),
    t.boolean('Translated'),
    t.primary(['PassageID', 'ParagraphIndex'])
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('Paragraph').dropTable('Passage')
}
