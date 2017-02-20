(function(){
    'use strict';

    var builder = require('botbuilder'),
        restify = require('restify'),
        config  = require('./config.js'),
        request = require('superagent');

   var connector = new builder.ChatConnector({
        appId: config.appId,
        appPassword: config.password
    });

    var bot = new builder.UniversalBot(connector);

    //https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/cad9a726-737b-43b7-84be-1ffbbc63bff3?subscription-key=6950d56827194cd0a8062958e70554b6&verbose=true
    bot.dialog('/',(session)=>{
       request
           .get('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/cad9a726-737b-43b7-84be-1ffbbc63bff3?subscription-key=6950d56827194cd0a8062958e70554b6&verbose=true&q=' +            session.message.text.replace(/\s/g,'+'))
           .then((res)=>
                 {
                    session.send(`Intent is : ${res.body.topScoringIntent.intent} with score : ${res.body.topScoringIntent.score}`);
                    console.log(res);
                 }, (err) => {
                    session.send('Ooops an error has occured!!!');
                 }
            );
    });

     var server = restify.createServer();
    server.listen(8080,() => {
        console.log('Starting up server....');
    });

    server.post('/api/messages', connector.listen());
}());
