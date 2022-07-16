const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser =  require('body-parser');
const cors =  require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsOfPosts = {}

app.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    return res.status(200).json(commentsOfPosts[id] || []);
})
app.post('/api/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
   const { content } = req.body;
   const { id } = req.params;
   const comments =  commentsOfPosts[id] || [];
   comments.push({content, id: commentId});
   commentsOfPosts[id] = comments;
   return res.status(201).json(commentsOfPosts[id]);
});


app.listen(4001, ()=> console.log('listen on 4001'));