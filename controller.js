const Comment = require("./models/comment.js");

module.exports = {
    /*
    GET: return all comments for the specific article
    req.params.article = String
    response = [Comment]
    */
    getComments: function(req, res){
        Comment.find({article: req.params.article})
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