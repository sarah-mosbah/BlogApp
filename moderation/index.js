const express = require('express');
const axios =  require('axios');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.post('/events', async (req,res)=> {
    const {type, data} = req.body;
    if(type === 'CommentCreated') {
        const status = data.comment.includes('orange') ? 'rejected': 'approved';
        await axios.post('http://localhost:5558/events', {
            type: 'CommentModerated',
            data: {
                id: data.commentId,
                status,
                comment: data.comment,
                postId: data.postId
            }
        })
    }
    return res.send(200);
 });
app.listen(5559, ()=> console.log('listen on 5559'));