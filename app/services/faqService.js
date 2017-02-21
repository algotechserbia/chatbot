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
                .set('Ocp-Apim-Subscription-Key' , process.env.FAQ_SUB_KEY || 'c5586a05d36444f18dd4111c3462d80e')
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
