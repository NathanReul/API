module.exports = function (persistence){ 

    var UserSchema = new persistence.Schema({
        id: { type: Number, index: true, required:true },
        name: { type: String, default: "" },
        age: { type: Number, default: 0 },
        address: {
            country: { type: String, default: "" },
            city: { type: String,  default: "" },
            adressline: { type: String, default: "" }
        }
      });

    return new persistence.model('user', UserSchema);
}