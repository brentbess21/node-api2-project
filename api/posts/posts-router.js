// implement your posts router here
const express = require('express')
const Post = require('./posts-model')
const router = express.Router()

router.get('/', async (req, res)=> {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    }
    catch (err) {
        res.status(500).json({
            message: "The posts information could not be retrieved"
        })
    }
});

router.get('/:id', async (req, res)=> {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(post)
        }
    }
    catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    }
});

//put GET /api/posts/:id/comments here

// router.post('/', async (req, res)=> {
//     try {
//         const { title, contents } = req.body;
//         if (!title || !contents) {
//             res.status(400).json({
//                 message: "Please provide title and contents for the post"
//             })
//         } else { 
//             const newPost = await Post.insert({title, contents});
//             res.status(201).json(newPost)
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             message: "There was an error while saving the post to the database"
//         })
//     }
// })

router.post('/', (req, res)=> {
    const { title, contents } = req.body
    if(!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Post.insert({ title, contents })
            .then(({ id })=> {
                return Post.findById(id)
            })
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err=> {
                res.status(500).json({
                    message: "There was an error while saving the post to the database"
                })
            })
    }
});

router.put('/:id', async (req, res)=> {
    try{
        const { title, contents } = req.body
        const { id } = req.params

        if (!title || !contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            const updatedPost = await Post.update(id, {title, contents});
            if (!updatedPost) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else { 
                res.status(200).json(updatedPost)
            }
        }
        

    }
    catch (err) {
        res.status(500).json({
            message: "The post information could not be modified"
        })
    }
});

router.delete("/:id", async (req, res)=> {
    try{
        const { id } = req.params;
        const deletedPost = await Post.remove(id)

        if(!deletedPost) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(deletedPost);
        }

    }
    catch (err) {
        res.status(500).json({
            message: "The post could not be removed"
        })
    }
});

router.get('/:id/comments', async (req, res)=> {
    try {
        const { id } = req.params
        const post = await Post.findById(id);
        if (!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
        
        }
    }
    catch{
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })
    }
})
module.exports = router;