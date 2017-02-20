(function(){
    'use strict';

    var builder = require('botbuilder'),
        restify = require('restify'),
        config  = require('./config.js'),
        request = require('superagent'),
        luisService = require('./services/luisService.js');

   var connector = new builder.ChatConnector({
        appId: config.appId,
        appPassword: config.password
    });

    var bot = new builder.UniversalBot(connector);

    bot.dialog('/',(session)=>{
        luisService.get(session.message.text)
            .then((res)=>{
                session.send(`Intent is : ${res.topScoringIntent.intent} with score : ${res.topScoringIntent.score}`);
            }, (err) => {
        });
    });

     var server = restify.createServer();
    server.listen(8080,() => {
        console.log('Starting up server....');
    });

    server.post('/api/messages', connector.listen());
}());
