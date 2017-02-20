module.exports = (function(){
    var builder = require('botbuilder');

    return {
        label: 'HelloDialog',
        resolveDialog: [
            function (session) {
            let card = new builder.HeroCard(session)
                            .title("Microsoft Bot Framework")
                            .text("Your bots - wherever your users are talking.")
                            .images([builder.CardImage.create(session, "https://www.contactcenterworld.com/images/company/Algotech-600px-logo.jpg")]);
            let msg = new builder.Message(session).attachments([card]);
            session.send(msg);
            session.send("Welcome to Algotech Bot!");
            session.beginDialog('/menu');
            }
        ]
    }
}());
