// implement your server here
// require your posts router and connect it here

const express = require('express')
const Post = require('./posts/posts-model')

const server = express();

server.use(express.json())

server.get('/api/posts', async (req, res)=> {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    }
    catch{
        res.status(500).json({
            message: "The posts information could not be retrieved"
        })
    }
})

module.exports = server;