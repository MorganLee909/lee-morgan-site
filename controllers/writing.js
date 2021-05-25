const Comment = require("../models/comment.js");

const fs = require("fs");

module.exports = {
    listDirectories: function(req, res){
        const searchDir = (dir, array)=>{
            let contents = fs.readdirSync(dir);

            for(let i = 0; i < contents.length; i++){
                if(contents[i].includes(".") === false){
                    let obj = {
                        name: contents[i],
                        contents: []
                    };
                    array.push(obj);
                    searchDir(`${dir}/${contents[i]}`, obj.contents);
                }
            }

            if(contents.includes("article.txt")){
                let meta = fs.readFileSync(`${dir}/meta.txt`).toString().split("\n");
                array.push({
                    title: meta[0],
                    route: dir.substring(dir.indexOf("/content/writing/") + 8),
                    img: `${dir}/mainImage.jpg`
                });
            }
            return array;
        }

        let directoryDescription = [];
        searchDir(`${__dirname}/../content/writing`, directoryDescription);

        return res.json(directoryDescription);
    },

    /*
    GET: return all comments for the specific article
    req.params.article = String
    response = [Comment]
    */
    getComments: function(req, res){
        Comment.aggregate([
            {$match: {
                article: req.params.article
            }},
            {$sort: {
                date: -1
            }}
        ])
            .then((comments)=>{
                return res.json(comments);
            })
            .catch((err)=>{
                return res.json("Couldn't retrieve the comments");
            });
    },

    /*
    POST: create a new comment
    req.body = {
        article: String,
        name: String,
        content: String,
        date: Date
    }
    response = Comment
    */
    createComment:  function(req, res){
        let comment = new Comment({
            article: req.body.article,
            name: req.body.name,
            content: req.body.content,
            date: new Date(req.body.date)
        });

        comment.save()
            .then((comment)=>{
                return res.json(comment);
            })
            .catch((err)=>{
                return res.json("Couldn't create your comment");
            });
    }
}