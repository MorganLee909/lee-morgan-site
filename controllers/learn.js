const Uploader = require("../models/uploader.js");
const Course = require("../models/course.js");
const Lecture = require("../models/lecture.js");

module.exports = {
    /*
    POST: create a new course
    req.body = {
        uploaderId: String,
        password: String,
        courseId:  String,
        title: String
        thumbNail: String,
        description: String
    }
    redirect to home
    */
    createCourse: function(req, res){
        Uploader.findOne({_id: req.body.uploaderId})
            .then((uploader)=>{
                if(uploader === null) throw "uploader";
                if(req.body.password !== uploader.password) throw "pass";
                let imgString = `./thumbNails/${req.files.thumbNail.name}`;
                req.files.thumbNail.mv(imgString);

                let course = new Course({
                    owner: uploader._id,
                    courseId: req.body.courseId,
                    title: req.body.title,
                    thumbNail: imgString,
                    description: req.body.description
                });

                return course.save();
            })
            .then((course)=>{
                return res.redirect("/");
            })
            .catch((err)=>{
                if(err === "uploader") return res.json("Uploader doesn't exist");
                if(err === "pass") return res.json("Incorrect password");
                return res.json("Something went wrong on the backend");
            });
    },

    getCourseGroups: function(req, res){
        console.log("something");
    }
}