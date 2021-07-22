const Uploader = require("../models/uploader.js");
const Course = require("../models/course.js");
const Lecture = require("../models/lecture.js");

module.exports = {
    /*
    POST: create a new course
    req.body = {
        uploaderId: String,
        password: String,
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
                let imgString = `/thumbNails/${req.files.thumbNail.name}`;
                req.files.thumbNail.mv(`${__dirname}/..${imgString}`);

                let course = new Course({
                    owner: uploader._id,
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

    /*
    POST: create a new lecture
    req.body = {
        uploader: String
        password: String
        course: String
        title: String
        video: String
        description: String
        exercises: [String]
        documents: [{
            title: String
            link: String
        }]
    }
    redirects to home
    */
    createLecture: function(req, res){
        Course.findOne({_id: req.body.course})
            .populate("owner")
            .then((course)=>{
                if(course === null) throw "noCourse";
                if(req.body.uploader !== course.owner._id.toString()) throw "badOwner";
                if(req.body.password !== course.owner.password) throw "badPass";

                let exercises = req.body.exercises.split("~");
                exercises.splice(exercises.length - 1, 1);

                let lecture = new Lecture({
                    course: course._id,
                    title: req.body.title,
                    video: req.body.video,
                    description: req.body.description,
                    exercises: exercises,
                    documents: []
                });

                if(req.files !== null){
                    let files = req.files.documents;
                    if(files.length === undefined){
                        let fileString = `/documents/${files.name}`;
                        files.mv(`${__dirname}/..${fileString}`);
                        lecture.documents.push(fileString);
                    }else{
                        for(let i = 0; i < files.length; i++){
                            let fileString = `/documents/${files[i].name}`;
                            files[i].mv(`${__dirname}/..${fileString}`);
                            lecture.documents.push(fileString);
                        }
                    }
                }

                return lecture.save();
            })
            .then((lecture)=>{
                return res.redirect("/");
            })
            .catch((err)=>{
                console.log(err);
                if(err === "noCourse") return res.json("Course does not exist");
                if(err === "badOwner") return res.json("You do not own this course");
                if(err === "badPass") return res.json("Incorrect password");
                return res.redirect("/");
            });
    },

    getCourses: function(req, res){
        Course.find()
            .then((courses)=>{
                return res.json(courses);
            })
            .catch((err)=>{
                return res.json("Could not retrieve courses");
            });
    },

    /*
    GET: get a list of lectures from a course
    req.params.id = String (course id)
    response = {
        course: Course,
        lectures: [Lecture]
    }
    */
    getLectures: function(req, res){
        let course = Course.findOne({_id: req.params.id});
        let lectures = Lecture.find({course: req.params.id});

        Promise.all([course, lectures])
            .then((response)=>{
                return res.json({course: response[0], lectures: response[1]});
            })
            .catch((err)=>{
                return res.json("Could not retrieve lectures");
            });
    },

    /*
    GET: get data for a single lecture
    req.params.id = String (lecture id)
    response = Lecture
    */
    getLecture: function(req, res){
        Lecture.findOne({_id: req.params.id})
            .populate("course")
            .then((lecture)=>{
                return res.json(lecture);
            })
            .catch((err)=>{
                return res.json("Could not retrieve lecture");
            });
    }
}