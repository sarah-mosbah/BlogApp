const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(5557, () => console.log('App Listening on 5557'));