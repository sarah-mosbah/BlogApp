const express = require('express');
const { randomBytes } = require('crypto');
const cors =  require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const commentsOfPosts = {}

app.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    return res.status(200).json(commentsOfPosts[id] || []);
});
app.post('/api/posts/:id/comments',  (req, res) => {
    const commentId = randomBytes(4).toString('hex');
   const { content } = req.body;
   const { id } = req.params;
   const comments =  commentsOfPosts[id] || [];
   comments.push({content, id: commentId, status: 'pending'});
   commentsOfPosts[id] = comments;
   axios.post('http://localhost:5558/events', {
    type: "CommentCreated",
    data:  {postId: id, comment: content, commentId,  status: 'pending'}
   });
   return res.status(201).json(commentsOfPosts[id]);
});
app.post('/events', async (req,res)=> {
    const {type, data} = req.body;
    if(type === 'CommentModerated') {
        const {postId, id, status} = data;
        const comments = commentsOfPosts[postId];
        const updatedComment = comments.find((x) => x.id ===  id);
        updatedComment.status = status;
        await axios.post('http://localhost:5558/events', {
            data: {
                ...updatedComment,
                postId
            },
            type: 'CommentUpdated'
        })
    }
    return res.status(200)
 });
 

app.listen(5556, ()=> console.log('listen on 5556'));