const express = require('express');
const app = express();
const cors =  require('cors');
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const posts = {};
app.post('/events', (req,res)=> {
    const {type, data} = req.body;
    if(type === "PostCreated") {
        const {id, title} = data.post;
        posts[id] = {
            id, title, comments: []
        }
        return res.status(200).json(posts[id]);
    } else if (type === "CommentCreated") {
      const {postId, comment, commentId, status } = req.body.data;
      if(!posts[postId])
        return res.status(404).json({message: "Post Not Found"});
        const { comments } = posts[postId];
        comments.push({postId, comment, commentId, status });
        console.log(posts[postId].comments);
        return res.status(200).json(posts[postId]);
    }
   
   
 });

app.get('/posts', async (req, res) => {
    return res.status(200).json(posts);
});
 
app.listen(5557, () => console.log('App Listening on 5557'));