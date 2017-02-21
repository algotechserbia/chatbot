module.exports = (function(){

   function createTelemetry(session,properties) {
        let data = {
            conversationData: JSON.stringify(session.conversationData),
            privateConversationData: JSON.stringify(session.privateConversationData),
            userData: JSON.stringify(session.userData),
            conversationId: session.message.address.conversation.id,
            userId: session.message.address.user.id
        };

        if (properties) {
            for (property in properties) {
                data[property] = properties[property];
            }
        }

        return data;
    }

    return {
        createTelemetry : createTelemetry
    }
}());


/*
==================================

// perform search
var measuredEventTelemetry = telemetryModule.createTelemetry(session);
var timerStart = process.hrtime();

try {
   // something
} catch (error) {
    measuredEventTelemetry.exception = error.toString();
    appInsightsClient.trackException('search', t);
} finally {
    var timerEnd = process.hrtime(timerStart);
    measuredEventTelemetry.metrics = (timerEnd[0], timerEnd[1] / 1000000);
    appInsightsClient.trackEvent('timeTaken', measuredEventTelemetry);
}

==================================
*/
