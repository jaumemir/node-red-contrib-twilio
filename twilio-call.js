var _internals = {};

_internals.call = function (payload, creds, cb) {
        
    var client = require('twilio')(creds.api_sid, creds.api_token);
    
    //Place a phone call, and respond with TwiML instructions from the given URL
    client.makeCall({

        to: payload.to, // Any number Twilio can call
        from: payload.from, // A number you bought from Twilio and can use for outbound communication
        url: payload.twilio_url // A URL that produces an XML document (TwiML) which contains instructions for the call

    }, function(err, responseData) {

        cb(err, responseData)

    });
};


module.exports = function(RED) {
    'use strict';

    function Node(n) {
      
        RED.nodes.createNode(this,n);

        var node = this;
        
        this.on('input', function (msg) {
            
            var creds = RED.nodes.getNode(n.creds);
            
            var payload = typeof msg.payload === 'object' ? msg.payload : {};
        
            var attrs = ['to', 'from', 'twilio_url'];
            for (var attr of attrs) {
                if (n[attr]) {
                    payload[attr] = n[attr];     
                }
            }
            
            _internals.call(payload, creds, function(err, result){
        
                msg.payload = result;
                node.log(JSON.stringify(err));
                node.log(JSON.stringify(result));
                node.send(msg);
            });
             
        });
    }

    RED.nodes.registerType('twilio-call', Node);
};
