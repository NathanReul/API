var helper = require('../helper.js');
const jwt = require('jsonwebtoken');
const settings = require('../../data/settings.json');

module.exports = async function (api, persistence) {

    //Create AuthModel based on schemaAuth
    var AuthModel = require('../schemas/schemaAuth')(persistence); 

    //Get bearer token with client secret
    api.get('/token', async function (req, res) {
        var ClientSecret = req.query.secret;

        var Bearer = await AuthModel.findOne({ secret: ClientSecret })
        if (!Bearer){ return res.json({ message: "Client secret invalid" }); }

        const AccessToken = jwt.sign({username: Bearer.username}, settings.AccessTokenSecret, { expiresIn: '5m' });

        res.json({ accessToken:AccessToken});
    });

}