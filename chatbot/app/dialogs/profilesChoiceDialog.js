module.exports = (function(){
    var builder = require('botbuilder');

    return {
        label: 'ProfilesChoiceDialog',
        resolveDialog: [
            function(session){
                 var msg = new builder
                                .Message(session)
                                .attachmentLayout(builder.AttachmentLayout.carousel)
                                .attachments([
                                        new builder.HeroCard(session)
                                            .title("Trio package")
                                            .subtitle("Choose Trio package for more info.")
                                            .images([
                                                builder.CardImage.create(session, "https://i.ytimg.com/vi/RNaRXkyZxBU/maxresdefault.jpg")
                                                    .tap(builder.CardAction.showImage(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/800px-Seattlenighttimequeenanne.jpg")),
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session, "http://sbb.rs/paketi/paketi", "Online Info"),
                                                builder.CardAction.imBack(session, "select:100", "Select")
                                            ]),
                                                new builder.HeroCard(session)
                                                    .title("Duo Net")
                                                    .subtitle("Choose Duo Net package for more info.")
                                                    .images([
                                                        builder.CardImage.create(session, "http://sbb.rs/Picture/11087/png/duo-masa-i-meda.png")
                                                            .tap(builder.CardAction.showImage(session, "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/PikePlaceMarket.jpg/800px-PikePlaceMarket.jpg")),
                                                    ])
                                                    .buttons([
                                                        builder.CardAction.openUrl(session, "http://sbb.rs/paketi/paketi", "Online Info"),
                                                        builder.CardAction.imBack(session, "select:101", "Select")
                                                ]),
                                            new builder.HeroCard(session)
                                                .title("Duo Tel")
                                                .subtitle("Choose Duo Tel package for more info.")
                                                .images([
                                                    builder.CardImage.create(session, "http://telemach.ba/Picture/1450/png/duo-tel.png")
                                                        .tap(builder.CardAction.showImage(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Night_Exterior_EMP.jpg/800px-Night_Exterior_EMP.jpg"))
                                                ])
                                                .buttons([
                                                    builder.CardAction.openUrl(session, "http://sbb.rs/paketi/paketi", "Online Info"),
                                                    builder.CardAction.imBack(session, "select:102", "Select")
                                                ])
                                            ]);
                builder.Prompts.choice(session, msg, "select:100|select:101|select:102");
            },
            (session,results) => {
                 session.endDialog();
            }
        ]
    }
}());
