module.exports = (function(){
    'use strict';

    var config = require('../config.js');
    var request = require('superagent');

    function get(message){
        if(message == '') return Promise.reject('You didn\'t provide any message.');

        return new Promise((resolve,reject)=>{
            request
               .get(config.luisUrl)
               .query({ 'subscription-key' : config.subscriptionKey })
               .query({ verbose : true })
               .query({ q: message.replace(/\s/g,'+')})
               .then((res)=>
                     {
                        resolve(res.body);
                     }, (err) => {
                        reject(err);
                     }
                );
        });
    }

    return {
        get: get
    }
}());
