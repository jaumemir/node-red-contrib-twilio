module.exports = function(RED) {
    function RemoteServerNode(n) {
        RED.nodes.createNode(this,n);
        this.api_sid = n.api_sid;
        this.api_token = n.api_token;
    }

    RED.nodes.registerType("twilio-connection", RemoteServerNode);
}