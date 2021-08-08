module.exports = function (RED) {
  function xor_crypt(str, key) {
    var output = "";
    for (var i = 0; i < str.length;) {
      for (var j = 0; (j < key.length && i < str.length); j++, i++) {
        output += String.fromCharCode(str[i].charCodeAt(0) ^ key[j].charCodeAt(0));
      }
    }
    return output;
  }
  function decodeMsg(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function (msg) {
      var str = msg.payload;
      var buff = new Buffer(str, 'base64');
      str = buff.toString('ascii');
      str = xor_crypt(str, msg.secret);
      msg.payload = str;
      node.send(msg);
    });
  }
  RED.nodes.registerType("decode", decodeMsg);
}