# node-red-contrib-fastest-validator
Fastest Validator Port for NodeRED

Uses the [Fastest Validator](https://github.com/icebob/fastest-validator) to validate the received message.

You could validate any property of msg, and return of failed validations will be stored on msg.errors property.

Note: You could only write a valid JSON schema to validate your message and JSON form not support js functions(custom fastest validator rules).

This is the first version, I've needed validate various rules at same time and think that we needed to have more performance and personalization, I know that module is the best in performance, now is working with nodered.
