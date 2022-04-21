var helper = require('../helper.js');
const jwt = require('jsonwebtoken');

module.exports = async function (api, persistence) {
 
    //Create a document model based on the schema in /src/schemas/schemaUser.js
    var UserModel = require('../schemas/schemaUser')(persistence); 

    //Get all users
    api.get('/users', async function (req, res) {
        var AuthResult = await helper.AuthorizeHeader(req.headers['authorization']);
        if (!AuthResult) { return res.sendStatus(403)}
        const users = await UserModel.find({});
        res.json(users);
    });

    //Get single user by ID
    api.get('/user', async function (req, res) {
        var AuthResult = await helper.AuthorizeHeader(req.headers['authorization']);
        if (!AuthResult) { return res.sendStatus(403)}
        const user = await UserModel.findOne({"id":req.query.id});
        res.json(user);
    });

    //Create new user
    api.post('/user/create', async function (req, res) {
        var AuthResult = await helper.AuthorizeHeader(req.headers['authorization']);
        if (!AuthResult) { return res.sendStatus(403)}
        var ValidationResult = helper.ValidateUser(req.body);
        if (ValidationResult === true){
            const HighestUser = await UserModel.find({},['id'],{skip:0,limit:1,sort:{id:-1}});
            if (HighestUser[0]){
                var id = HighestUser[0].id + 1;
            } else var id = 0;
            req.body.id = id;
            const user = await UserModel.create(req.body);
            res.json(user);
        }
        else {res.json({message:'Error validating field: ' + ValidationResult})}
    });

    //Update existing user
    api.put('/user/update', async function (req, res) {
        var AuthResult = await helper.AuthorizeHeader(req.headers['authorization']);
        if (!AuthResult) { return res.sendStatus(403)}
        const ValidationResult = helper.ValidateUser(req.body);
        if (ValidationResult === true){
            const user = await UserModel.findOneAndUpdate({id:req.body.id},req.body,{new: true});
            res.json(user);
        }
        else {res.json({message:'Error validating field: ' + ValidationResult})}
    });

    //Delete a user based on ID
    api.delete('/user/delete', async function (req, res) {
        var AuthResult = await helper.AuthorizeHeader(req.headers['authorization']);
        if (!AuthResult) { return res.sendStatus(403)}
        var deleted = await UserModel.deleteOne({id:req.query.id});
        res.json(deleted);
    });
}