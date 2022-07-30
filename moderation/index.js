const express = require('express');
const axios =  require('axios');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/events', (req,res)=> {
    console.log('recieved event', req.body);
    return res.status(200);
 });
app.listen(5559, ()=> console.log('listen on 5559'));