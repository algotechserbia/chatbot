module.exports = (function() {
    let builder = require('botbuilder');

    return {
        label: 'MainDialog',
        resolveDialog: [
            (session) => {
                let style = builder.ListStyle["button"];
                builder.Prompts.choice(session, "\nPlease choose an option below.", "PROFILES|NETWORK STATUS|COMPLAINTS", { listStyle: style });
        },  (session, results) => {
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
