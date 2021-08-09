const Blog = require("../models/blog.js");
const Uploader = require("../models/uploader.js");
const createId = require("./createId.js");

module.exports = {
    /*
    POST: create a new blog
    req.body = {
        uploader: String (uploader id)
        password: String
        title: String
        tags: String
        blog: String
    }
    req.files = {
        thumbnail: File
    }
    redirect to home
    */
    create: function(req, res){
        Uploader.findOne({_id: req.body.uploader})
            .then((uploader)=>{
                if(uploader === "none") throw "uploader";
                if(req.body.password !== uploader.password) throw "pass";

                let fileString = `/thumbNails/${createId(25)}`;
                req.files.thumbnail.mv(`${__dirname}/..${fileString}`);

                let blog = new Blog({
                    writer: uploader._id,
                    title: req.body.title,
                    tags: req.body.tags.split(","),
                    thumbnail: fileString,
                    article: req.body.blog
                });

                return blog.save();
            })
            .then((blog)=>{
                return res.redirect("/");
            })
            .catch((err)=>{});
    },

    /*
    GET: get a list of all blogs
    response = [Blog]
    */
    getBlogs: function(req, res){
        Blog.aggregate([{$project: {article: 0}}])
            .then((blogs)=>{
                return res.json(blogs);
            })
            .catch((err)=>{
                return res.json("ERROR: could not retrieve blog data");
            });
    },

    /*
    GET: gets a single blog
    req.params.id = String (blog id)
    response = Blog
    */
    getBlog: function(req, res){
        Blog.findOne({_id: req.params.id})
            .populate("writer")
            .then((blog)=>{
                return res.json(blog);
            })
            .catch((err)=>{
                return res.json("Error: unable to retrieve the blog");
            });
    }
}