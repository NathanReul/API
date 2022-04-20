module.exports = function (persistence){ 

    var AuthSchema = new persistence.Schema({
        username: { type: String, default: "" },
        secret: { type: String, default: "" }
      });

    return new persistence.model('auth', AuthSchema);
}