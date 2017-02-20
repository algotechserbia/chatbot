(function(){
    'use strict';

    var builder = require('botbuilder'),
        restify = require('restify');

   var connector = new builder.ChatConnector({
        appId: '',
        appPassword: ''
    });

    var bot = new builder.UniversalBot(connector);


    bot.dialog('/',(session)=>{
        session.send('Hello');
    });
    /*
    // root dialog
    bot.dialog('/', new builder.IntentDialog()
              .matchesAny([/help/i,/support/i,/problem/i],
                         [
        (session) => {
            // opening dialog
            //session.beginDialog('support');
        },
        (session,result) => {
            // on return from dialog
            var tickerNumber = result.reponse;
            session.send('Thank you');
            session.endDialog();
        }
    ]).onDefault([
        (session) => {

        }
    ]));
    */

     var server = restify.createServer();
    server.listen(8080,() => {
        console.log('Starting up server....');
    });

    server.post('/api/messages', connector.listen());
}());
