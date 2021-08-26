module.exports = function (RED) {
  const lib = require("./xor_crypt");
  function decodeMsg(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function (msg) {
      var str = msg.payload;
      var buff = new Buffer(str, 'base64');
      str = buff.toString('ascii');
      if (msg.secret != "") {
        str = lib.xor_crypt(str, msg.secret);
        if (str != ""){
            msg.payload = str;
            node.send(msg,false);
        }
      }
    });
  }
  RED.nodes.registerType("a_decode", decodeMsg);
}
