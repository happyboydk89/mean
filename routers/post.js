const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const config = require('../config/database');

router.post('/create', (req, res, next) => {
    let newPost = new Post({
        postname : req.body.postname,
        content : req.body.content,
        postdate : req.body.postdate,
        userid : req.body.userid
    });

    console.log(newPost);
    
    Post.addPost(newPost, (err, post)=>{
        if(err){
            res.json({success: false, msg:'Post Create faild'})
        }else{
            res.json({success: true, msg:'Post Create'})
        }
    })
    
});

module.exports = router;