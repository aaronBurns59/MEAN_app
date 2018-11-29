var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//allows us to access the mlab mongo database 
var mongoose = require('mongoose');
var mongoDB = 'mongodb://admin:hello1@ds239873.mlab.com:39873/posts';
mongoose.connect(mongoDB);

//a schema used for working with the data in the json database
var Schema = mongoose.Schema;
var postSchema = new Schema({
    title: String,
    content: String,
    race: String,
    background: String,
    level: Number
})
var statSchema= new Schema({
    stats:Array
})

var PostModel = mongoose.model('post', postSchema);
var StatModel = mongoose.model('stat', statSchema);

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

//writes a new entry into the database 
app.post('/api/posts', function(req, res){
    console.log("post successful");
    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.body.race);
    console.log(req.body.background);
    console.log(req.body.level);

    PostModel.create({
        title: req.body.title,
        content: req.body.content,
        race: req.body.race,
        background: req.body.background,
        level: req.body.level
    });
    res.send("Post added successfully");
})

app.post('/api/stats', function(req, res){
    console.log("stats post successful");
    console.log(req.body.stats);
   
    StatModel.create({
        stats:req.body.stats,
    });
    res.send("Stat added successful");
})

//gets the post from the mlab database
app.get('/api/posts', function(req, res){
    PostModel.find(function(err, post){
        res.json(post);
    });
})

app.get('/api/stats', function(req, res){
    StatModel.find(function(err, stat){
        res.json(stat);
    });
})

//update server
app.get('/api/posts/:id', function(req, res){
    console.log("Read doc with id"+ req.params.id);

    PostModel.findById(req.params.id, function(err, data)
    {
        res.json(data);
    });
})

app.get('/api/stats/:id', function(req, res){
    console.log("Read Doc with id"+ req.params.id);

    StatModel.findById(req.params.id, function(err, data)
    {
        res.json(data);
    })
})

app.put('/api/posts/:id', function(req, res){
    console.log("Update called on"+req.params.id);
    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.body.race);
    console.log(req.body.background);
    console.log(req.body.level);
    
    PostModel.findByIdAndUpdate(req.params.id, req.body, function(err, data)
    {
        res.send(data);
    })
})

app.put('/api/stats/:id', function(req, res){
    console.log("Update called on"+req.params.id);
    console.log(req.body.stats);

    StatModel.findByIdAndUpdate(req.params.id, req.body, function(err, data){
        res.send(data);
    })
})

//deletes an entry from the mlab database
app.delete('/api/posts/:id', function(req, res){
    console.log(req.params.id);
    PostModel.deleteOne({_id:req.params.id}, function(err, data)
    {
        if(err)
        {
            res.send(err)
        }
        res.send(data);
    });
});

app.delete('/api/stats/:id', function(req,res){
    console.log(req.params.id);
    StatModel.deleteOne({_id:req.params.id}, function(err, data)
    {
        if(err)
        {
            res.send(err)
        }
        res.send(data);
    });
})

//connects the server to the port localhost:8081
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})