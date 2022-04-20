const jwt = require('jsonwebtoken');
const settings = require('../data/settings.json');

module.exports = {
    ValidateUser: function (user){
        if (!typeof user.name == 'string') { return 'name'; }
        if (!typeof user.age == 'number') { return 'age'; }
        if (!user.address) { return 'address'; }
        if (!typeof user.address.country == 'string') { return 'country'; }
        if (!typeof user.address.city == 'string') { return 'city'; }
        if (!typeof user.address.adressline == 'string') { return 'adressline'; }
        return true;
    },
    AuthorizeHeader: async function (AuthHeader){
        return new Promise((resolve, reject) => {
            const token = AuthHeader && AuthHeader.split(' ')[1];
            if (!token) resolve(false);
            jwt.verify(token, settings.AccessTokenSecret, async (err, payload) => {
                if (err) resolve(false);
                console.log('Authorized request:');
                console.log(payload);
                resolve(payload);
            });
        });
    }
}