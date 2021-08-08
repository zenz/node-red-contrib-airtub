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
  function encodeMsg(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function (msg) {
      var cmd = ',"cmd":1,"dev":"AIRMON_0000001"}';
      var str = msg.payload;
      str = str.substr(0, str.indexOf("}"));
      str = str + cmd;
      str = xor_crypt(str, msg.secret);
      var buff = new Buffer(str);
      str = buff.toString('base64');
      msg.payload = str
      node.send(msg);
    });
  }
  RED.nodes.registerType("encode", encodeMsg);
}