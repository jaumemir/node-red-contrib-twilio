var twilio = require('twilio');

var _internals = {};

_internals.say = function (payload, creds, cb) {
    
    var resp = new twilio.TwimlResponse();

    resp.say('Welcome to Twilio!');
    resp.say('Please let us know if we can help during your development.', {
        voice:'woman',
        language:'en-gb'
    });

    cb(null, resp.toString());  
    
};


module.exports = function(RED) {
    'use strict';

    function Node(n) {
      
        RED.nodes.createNode(this,n);

        var node = this;
        
        this.on('input', function (msg) {
            
            var creds = RED.nodes.getNode(n.creds);
            
            var payload = typeof msg.payload === 'object' ? msg.payload : {};
        
            var attrs = ['to', 'from', 'url'];
            for (var attr of attrs) {
                if (n[attr]) {
                    payload[attr] = n[attr];     
                }
            }
            
            _internals.say(payload, creds, function(err, result){
        
                msg.payload = result;
                node.log(JSON.stringify(err));
                node.log(JSON.stringify(result));
                node.send(msg);
            });
             
        });
    }

    RED.nodes.registerType('twilio-say', Node);
};
