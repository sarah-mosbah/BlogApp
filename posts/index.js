const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser =  require('body-parser');
const app = express();
const cors =  require('cors');

const posts = {};

app.use(bodyParser.json());
app.use(cors());


app.get('/api/posts', (req, res) => {
    return res.status(200).json(posts);
})
app.post('/api/posts', (req, res) => {
   const id = randomBytes(4).toString('hex');
   const { title } = req.body;
   posts[id] =  {id, title};
   return res.status(201).send(posts[id]);
});


app.listen(4000, ()=> console.log('listen on 4000'));