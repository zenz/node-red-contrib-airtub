module.exports = function (RED) {
  const lib = require("./xor_crypt");
  function encodeMsg(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function (msg) {
      var cmd = ',"cmd":1,"dev":"AIRMON_0000001"}';
      var str = msg.payload;
      str = str.substr(0, str.indexOf("}"));
      str = str + cmd;
      str = lib.xor_crypt(str, msg.secret);
      var buff = new Buffer(str);
      str = buff.toString('base64');
      msg.payload = str
      if (msg.secret == "")
        msg = {}
      node.send(msg);
    });
  }
  RED.nodes.registerType("encode", encodeMsg);
}