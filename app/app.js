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
        faqService = require('./services/faqService.js'),
        appInsights = require('applicationinsights'),
        telemetryCore = require('./core/telemetry.js');

    // appInsights setup
    //appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start();
    //let appInsightsClient = appInsights.getClient();

   let connector = new builder.ChatConnector({
        appId: process.env.MICROSOFT_APP_ID,
        appPassword: process.env.MICROSOFT_APP_PASSWORD
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
                    console.log(err);
                 });

                faqService.find(session.message.text)
                    .then((res) => {
                        session.send(`FAQ answer is ${res.answer}`);
                    }, (err) => {
                        console.log(err);
                });

                //let telemetry = telemetryCore.createTelemetry(session);
                //appInsightsClient.trackEvent('hello', telemetry);
            } else{
                session.beginDialog('/hello');
            }
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
    server.listen(process.env.PORT,() => {
        console.log('Starting up server....');
    });

    server.post('/api/messages', connector.listen());
}());
