const Course = require("../models/course.js");

module.exports = {
    /*
    POST: creates a new course
    req.body = {
        groupTitle: String,
        title: String,
        video: String,
        description: String,
        documents: [{
            title: String,
            link: String
        }],
        exercises: [String]
    }
    */
    createLecture: function(req, res){
        Course.find({groupTitle: req.body.groupTitle})
            .then((courses)=>{
                let max = 0;
                for(let i = 0; i < courses.length; i++){
                    let num = parseInt(courses[i].courseId.split("-")[1]);

                    if(num > max) max = num;
                }

                //from StackOverflow user "RobG"
                function pad(n, length) {
                    var len = length - (''+n).length;
                    return (len > 0 ? new Array(++len).join('0') : '') + n;
                }

                let newCourse = new Course({
                    courseId: `${courses[0].courseId.split("-")[0]}-${pad(max++)}`,
                    groupTitle: courses[0].groupTitle,
                    title: req.body.title,
                    video: req.body.video,
                    thumbNail: courses[0].thumbNail,
                    description: req.body.description,
                    documents: req.body.documents,
                    exercises: req.body.exercises
                });

                return newCourse.save();
            })
            .then((course)=>{
                return res.redirect("/");
            })
            .catch((err)=>{
                return res.json("Something went wrong");
            });
    },

    getCourseGroups: function(req, res){
        console.log("something");
    }
}