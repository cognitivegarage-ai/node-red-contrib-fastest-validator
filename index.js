module.exports = function (RED) {
    "use strict";
    const Validator = require("fastest-validator");
    const v = new Validator();
    
    function ValidatorFunction(n) {
        RED.nodes.createNode(this, n);
        this.props = n.props;
        this.name = n.name;
        var node = this;

        for (var i=0,l=n.props.length; i<l; i++) {
          var value = n.props[i].v ? n.props[i].v : '';
          var valueType = n.props[i].vt ? n.props[i].vt : 'json';
          var schema = RED.util.evaluateNodeProperty(value, valueType, this, {});
          n.props[i].ck = v.compile(schema);
        }

        node.on("close", function (done) {
          done();
        });
    
        node.on("input", function (msg, send, done) {
          let checks = [];
          send = send || function() { node.send.apply(node,arguments) }
          done = done || function(err) { if(err)node.error(err, msg); }
          node.props.forEach(p => {
            var property = p.p;
            var check = p.ck;
            if (!property){
              checks.push(true);
              return;
            }
            var data = RED.util.getMessageProperty(msg, property);
            checks.push(check(data));
          });
          if(checks.every((el)=>{ return el === true;})){
              send([msg,null]);
              done();
          }else{
              msg.errors = checks.map((el)=>{if(el === true){
                return [];
              }else{
                return el;
              }});
              send([null,msg]);
              done();
          }
        });
      }
      RED.nodes.registerType("fastest-validator", ValidatorFunction);
}