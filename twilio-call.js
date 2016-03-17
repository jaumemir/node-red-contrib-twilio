var _internals = {};

_internals.call = function (payload, creds, cb) {
        
    var client = require('twilio')(creds.api_sid, creds.api_token);

    //Place a phone call, and respond with TwiML instructions from the given URL
    client.makeCall({

        to:'+447968094455', // Any number Twilio can call
        from: '+441183100401', // A number you bought from Twilio and can use for outbound communication
        url: 'http://www.example.com/twiml.php' // A URL that produces an XML document (TwiML) which contains instructions for the call

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
        
            var attrs = ['store_id', 'postcode', 'delivery_date'];
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

    RED.nodes.registerType('onthedot-timeslot', Node);
};
