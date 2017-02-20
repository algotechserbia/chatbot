(function() {
    'use strict';

    let builder = require('botbuilder'),
        restify = require('restify'),
        config  = require('./config.js'),
        request = require('superagent'),
        luisService = require('./services/luisService.js'),
        helloDialog = require('./dialogs/helloDialog.js'),
        mainDialog = require('./dialogs/mainMenuDialog.js'),
        profilesChoiceDialog = require('./dialogs/profilesChoiceDialog.js'),
        faqService = require('./services/faqService.js');

   let connector = new builder.ChatConnector({
        appId: config.appId,
        appPassword: config.password
    });

    let bot = new builder.UniversalBot(connector);

    // root dialog
    bot.dialog('/',[
        (session) => {
            if(session.message.text.match(/hello/i)){
                luisService.find(session.message.text)
                    .then((res)=>{
                        session.send(`Intent is : ${res.topScoringIntent.intent} with score : ${res.topScoringIntent.score}`);
                    }, (err) => {
                 });

                faqService.find(session.message.text)
                    .then((res) => {
                        session.send(`FAQ answer is ${res.answer}`);
                    }, (err) => {
                        console.log(err);
                });
            } else{
                session.beginDialog('/hello');
            }
    } , (session,result) => {

    } , (session) => {
        session.send('See you later');
    }]);

    // main dialog
    bot.dialog('/menu', mainDialog.resolveDialog);

    // hello dialog
    bot.dialog('/hello',helloDialog.resolveDialog);

    // profiles choice dialog
    bot.dialog('/profiles_choice', profilesChoiceDialog.resolveDialog);

    // network choice dialog
    bot.dialog('/network_choice', []);

    // complaints choice dialog
    bot.dialog('/complaints_choice', []);

    let server = restify.createServer();
    server.listen(8080,() => {
        console.log('Starting up server....');
    });

    server.post('/api/messages', connector.listen());
}());
