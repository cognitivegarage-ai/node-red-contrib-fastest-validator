# node-red-contrib-fastest-validator
Fastest Validator Port for NodeRED

Uses the [Fastest Validator](https://github.com/icebob/fastest-validator) to validate the received message.

You could validate any property of msg, and return of failed validations will be stored on msg.errors property.

Note: You could only write a valid JSON schema to validate your message and JSON form not support js functions(custom fastest validator rules).

This is the first version, I've needed validate various rules at same time and think that we needed to have more performance and personalization, I know that module is the best in performance, now is working with nodered.

Sample flow:
```javascript
[{"id":"a7beeea5.de808","type":"inject","z":"a7ac9d93.2a563","name":"","props":[{"p":"payload"},{"p":"req.headers.authorization","v":"Bearer token","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"nome\":\"André Avila\",\"idade\":35}","payloadType":"json","x":230,"y":220,"wires":[["ad605d05.199fb"]]},{"id":"ad605d05.199fb","type":"fastest-validator","z":"a7ac9d93.2a563","props":[{"p":"req.headers","v":"{\"authorization\":{\"type\":\"string\",\"contains\":\"Bearer\"}}","vt":"json"},{"p":"payload","v":"{\"nome\":{\"type\":\"string\",\"min\":10,\"max\":50},\"idade\":{\"type\":\"number\",\"integer\":true,\"negative\":false,\"min\":18,\"max\":65}}","vt":"json"}],"name":"","x":420,"y":220,"wires":[["d8421ba5.611868"],["b037138a.7aa8"]]},{"id":"d8421ba5.611868","type":"debug","z":"a7ac9d93.2a563","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":610,"y":220,"wires":[]},{"id":"b037138a.7aa8","type":"debug","z":"a7ac9d93.2a563","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":610,"y":280,"wires":[]},{"id":"fde84eed.72049","type":"inject","z":"a7ac9d93.2a563","name":"","props":[{"p":"payload"},{"p":"req.headers.authorization","v":"","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"nome\":\"Alex Avila\",\"idade\":8}","payloadType":"json","x":230,"y":280,"wires":[["ad605d05.199fb"]]}]
```
