
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Paragraph').del()
  .then(function(){
    return knex('Passage').del()
    .then(function () {
      // Inserts seed entries
      return knex('Passage').insert([
        {
          Fromlanguage: "English", 
          Tolanguage: "Chinese",
          Payment: 0.5,
          Snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat",
          AllTranslated: false,
          Reviewed: false,
        },
        {
          Fromlanguage: "French", 
          Tolanguage: "English",
          Payment: 0.5,
          Snippet: "Je ne parle pas francais.",
          AllTranslated: false,
          Reviewed: false,
        },
      ])
    })
  })
};
