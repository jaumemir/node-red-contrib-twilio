var twilio = require('twilio');

module.exports = function(RED) {
    'use strict';

    function Node(n) {
      
        RED.nodes.createNode(this,n);

        var node = this;
        
        RED.httpAdmin.get(n.url, function(req,res) { 
        
           
            var resp = new twilio.TwimlResponse();

            resp.say('Welcome to Twilio!');
            resp.say('Please let us know if we can help during your development.', {
                voice:'woman',
                language:'en-gb'
            });

            res.send(resp.toString());        
        });
    }

    RED.nodes.registerType('twilio-say', Node);
};
