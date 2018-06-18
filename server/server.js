const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');

const {User} = require('./model/user');
var app = express();
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    User.find().then((user)=>{
        res.send(user);
    }).catch((e)=> res.send('not User'));
});

app.post('/user',(req,res)=>{
    var newUser = new User({
        email : req.body.email,
        password: req.body.password
    });

    newUser.save().then((doc)=>{
        res.send(doc);
    }).catch((e)=>res.send(e));
});

app.put('/user/:id',(req,res)=>{
    var id = req.params.id;
    User.findByIdAndUpdate(id,{
        $set:{test:req.body.test}
        }).then((doc)=>{
        res.send(doc);
    }).catch((e)=> res.send(e));
});

app.delete('/user/:id',(req,res)=>{
    var id = req.params.id;
    User.findByIdAndRemove(id).then((doc)=>{
        res.send(doc);
    }).catch((e)=> res.send(e));
});

app.listen(3000,()=>{
    console.log('server port 3000');
})