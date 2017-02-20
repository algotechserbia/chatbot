module.exports = (function(){
    var builder = require('botbuilder');

    return {
        label: 'MainDialog',
        resolveDialog: [
            function (session) {
                var style = builder.ListStyle["button"];
                builder.Prompts.choice(session, "\nPlease choose an option below.", "PROFILES|NETWORK STATUS|COMPLAINTS", { listStyle: style });
        },  function (session, results) {
                if(results.response.entity.match(/FILE/gi)){
                    session.beginDialog('/profiles_choice');
                }else if(results.response.entity.match(/TWO/gi)){
                    session.beginDialog('/network_choice');
                }else if(results.response.entity.match(/OMP/gi)){
                    session.beginDialog('/complaints_choice');
                }
            }
        ]
    }
}());
