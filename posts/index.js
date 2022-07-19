const express = require('express');
const { randomBytes } = require('crypto');
const cors =  require('cors');
const axios = require('axios');
const app = express();
const posts = {};
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.get('/api/posts', (req, res) => {
    return res.status(200).json(posts);
})
app.post('/api/posts', async (req, res) => {
   const id = randomBytes(4).toString('hex');
   const { title } = req.body;
   posts[id] =  {id, title};
   await  axios.post('http://localhost:5558/events', {
    type: "PostCreated",
    data:  {post: posts[id]}
   });
   return res.status(201).send(posts[id]);
});


app.listen(5555, ()=> console.log('listen on 5555'));