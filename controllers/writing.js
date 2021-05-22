const Comment = require("./models/comment.js");

const fs = require("fs");

module.exports = {
    listDirectories: function(req, res){
        const searchDir = function(path, currentObject){
            let response = fs.readdirSync(path);

            for(let i = 0; i < response.length; i++){
                if(response[i].includes(".") === false){
                    let newPath = `${path}/${response[i]}`;
                    let newObject = ({
                        name: response[i].replace(/-/g, " "),
                        path: newPath.substring(newPath.indexOf("/writing") + 7, newPath.length),
                        contents: []
                    });

                    currentObject.contents.push(newObject);
                    searchDir(newPath, newObject);
                }
            }

            return currentObject;
        }

        let result = searchDir(`${__dirname}/content`, {
            contents: []
        });

        return res.json(result.contents[0].contents);
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