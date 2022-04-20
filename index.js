const express = require('express');
const api = express();

api.use(express.json());

//Initialize the mongoDB database
const persistence = require('mongoose');
async function Main(){
    await persistence.connect('mongodb://127.0.0.1:27017/demo');
}

//Connect to the mongoDB Database, then initialize the controllers
Main().catch(err => console.log(err)).then(() => {
    console.log('Connected database!');
    InitializeControllers();
});

//Read all controllers (.js files in /src/controllers) and initialize them
function InitializeControllers(){
    var glob = require("glob");
    glob("src/controllers/*.js", async function (er, files) {
        files.forEach(function(fileName){ 
            require("./" + fileName)(api, persistence);
            console.log('Initialized ' + fileName);
        });
    });
}

api.listen(4921);

