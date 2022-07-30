const express = require('express');
const axios =  require('axios');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/events', (req,res)=> {
    const events = req.body;
    axios.post('http://localhost:5555/events', events);
    axios.post('http://localhost:5556/events', events);
    axios.post('http://localhost:5557/events', events);
    axios.post('http://localhost:5559/events', events);
    res.status(200);
});

app.listen(5558, () => console.log('Listen on 5558'));