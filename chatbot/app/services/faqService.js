module.exports = (function() {
    'use strict';

    let config = require('../config.js'),
        request = require('superagent');

    function find(message){
        if(message == '') return Promise.reject('You didn\'t provide any message.');

        return new Promise((resolve,reject)=>{
            request
                .post(config.faqURL)
                .send({ question : message })
                .set('Ocp-Apim-Subscription-Key' , config.faqSubKey)
                .set('Content-Type', 'application/json')
                .then((res) => {
                    resolve(res.body);
                }, (err) => {
                    reject(err);
                }
            );
        });
    }

    return {
        find:find
    }
}());
