const mogoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Post Shema
const PostSchema = mogoose.Schema({
    postname : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    postdate : {
        type : String,
        required : true
    },
    userid : {
        type : String,
        required : true
    }
})

const Post = module.exports = mogoose.model('Post', PostSchema);

module.exports.getPostById = function(id, callback){
    Post.findById(id, callback);
}

module.exports.getPostByPostname = function(Postname, callback){
    const query = {postname: postname}
    Post.findOne(query, callback);
}

module.exports.addPost = function(newPost, callback){
    newPost.save(callback);
    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(newPost.userid, salt, (err, hash)=> {
    //         if(err) throw err;
    //         newPost.userid = hash;
    //         newPost.save(callback);
    //     })
    // });
}
