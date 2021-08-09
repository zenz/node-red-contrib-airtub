function xor_crypt(str, key) {
    var output = "";
    for (var i = 0; i < str.length;) {
        for (var j = 0; (j < key.length && i < str.length); j++, i++) {
            output += String.fromCharCode(str[i].charCodeAt(0) ^ key[j].charCodeAt(0));
        }
    }
    return output;
}

module.exports = { xor_crypt };