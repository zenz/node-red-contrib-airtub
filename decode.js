module.exports = function (RED) {
  const lib = require("./xor_crypt");
  function decodeMsg(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function (msg) {
      var str = msg.payload;
      var buff = new Buffer(str, 'base64');
      str = buff.toString('ascii');
      str = lib.xor_crypt(str, msg.secret);
      msg.payload = str;
      if (msg.secret == "")
        msg = {}
      node.send(msg);
    });
  }
  RED.nodes.registerType("a-decode", decodeMsg);
}