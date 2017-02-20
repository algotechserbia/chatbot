(function(){
    'use strict';

    var builder = require('botbuilder'),
        restify = require('restify'),
        config  = require('./config.js'),
        request = require('superagent'),
        luisService = require('./services/luisService.js'),
        helloDialog = require('./dialogs/helloDialog.js'),
        mainDialog = require('./dialogs/mainMenuDialog.js'),
        profilesChoiceDialog = require('./dialogs/profilesChoiceDialog.js');

   var connector = new builder.ChatConnector({
        appId: config.appId,
        appPassword: config.password
    });

    var bot = new builder.UniversalBot(connector);

    // root dialog
    bot.dialog('/',[
        (session) => {
            if(session.message.text.match(/hello/i)){
                luisService.get(session.message.text)
                    .then((res)=>{
                        session.send(`Intent is : ${res.topScoringIntent.intent} with score : ${res.topScoringIntent.score}`);
                    }, (err) => {

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


    var server = restify.createServer();
    server.listen(8080,() => {
        console.log('Starting up server....');
    });

    server.post('/api/messages', connector.listen());
}());
