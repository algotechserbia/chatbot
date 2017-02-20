module.exports = (function() {
    'use strict';

    let config = require('../config.js'),
        request = require('superagent');

    function find(message){
        if(message == '') return Promise.reject('You didn\'t provide any message.');

        return new Promise((resolve,reject)=>{
            request
               .get(config.luisUrl)
               .query({ 'subscription-key' : config.luisSubKey })
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
        find: find
    }
}());
