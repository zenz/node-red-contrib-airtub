module.exports = function(RED) {
  function decodeMsg(config){
    RED.nodes.createNode(this,config);
    var node = this;
    node.on('input', function(msg) {
      var str = msg.payload;
      var buff = new Buffer(str, 'base64');
      str = buff.toString('ascii');
      msg.payload = str;
      node.send(msg);
    });
  }
  RED.nodes.registerType("decode", decodeMsg);
}
