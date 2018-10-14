function publishJob(bodyText, fromLanguage, toLanguage, payment){
    const paragraphs = bodyText.split('/\r?\n/');
    const snippet = bodyText.substr(0,150)
    const job = {
        "Fromlanguage": fromLanguage,
        "Tolanguage": toLanguage,
        "Payment": payment,
        "Snippet": snippet,
        "AllTranslated": false,
        "Reviewed": false
    }
    // post to UI?
    // insert into passage
    return knex('Passage').insert(job).returning('id')
    .then(id => {
        // parse and insert paragraphs
        p = [];
        for (let i = 0; i < paragraphs.length; i++) {
            p.push({
                "PassageID": id,
                "ParagraphIndex": i,
                "OriginalText": String(paragraphs[i]),
                //"TranslatedText": null,
                "Assigned": false,
                "Translated": false
            })
        }
        return knex('Paragraph').insert(p);
    });

}
