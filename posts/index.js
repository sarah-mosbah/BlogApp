const express = require('express');
const { randomBytes } = require('crypto');
const app = express();
const cors =  require('cors');

const posts = {};
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());



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