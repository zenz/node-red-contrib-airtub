module.exports = function(RED) {
  function encodeMsg(config){
    RED.nodes.createNode(this,config);
    var node = this;
    node.on('input', function(msg) {
      var cmd = ',"cmd":1,"dev":"AIRMON_0000001"}';
      var str = msg.payload;
      str = str.substr(0, str.indexOf("}"));
      str = str + cmd;
      let buff = new Buffer(str);
      str = buff.toString('base64');
      msg.payload = str
      node.send(msg);
    });
  }
  RED.nodes.registerType("encode", encodeMsg);
}
