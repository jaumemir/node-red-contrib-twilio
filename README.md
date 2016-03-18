# Twilio for NodeRED

[![RedConnect Approved](https://img.shields.io/badge/RedConnect-Approved-brightgreen.svg?style=flat)](https://www.redconnect.io/addons/)

An set of nodes that map the Twilio [NPM Module](https://twilio.github.io/twilio-node/).

## Installation

`npm install node-red-contrib-twilio`

## Implemented Nodes

These Nodes can be used along side the default Twilio Node.

Call Node - initialises a call to the number specified.

Say Node - Config for TWXML node to speak when called. Used in combination with the ```Call Node``` this can be used to create an automated phone system. Example Flow:

```
[{"id":"ead72efc.1528d","type":"twilio-say","z":"3fd12692.c02eda","creds":"","name":"","text":"","x":445,"y":246,"wires":[["cce71d4f.3318e"]]},{"id":"ca0a929e.35f57","type":"http in","z":"3fd12692.c02eda","name":"","url":"/say","method":"post","swaggerDoc":"","x":124,"y":245,"wires":[["6cd7c81c.932838"]]},{"id":"cce71d4f.3318e","type":"http response","z":"3fd12692.c02eda","name":"","x":602,"y":246,"wires":[]},{"id":"6cd7c81c.932838","type":"function","z":"3fd12692.c02eda","name":"","func":"msg.payload = {\n    text: \"Hi there, this is Red Connect, and I'm definitely a real human. I'm sorry to hear about your issue - how can I help you, fellow human?\"    \n};\nreturn msg;","outputs":1,"noerr":0,"x":294.5,"y":246,"wires":[["ead72efc.1528d"]]}]
```




