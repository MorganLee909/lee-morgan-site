const writing = require("./controllers/writing.js");
const gallery = require("./controllers/gallery.js");
const learn = require("./controllers/learn.js");
const blog = require("./controllers/blog.js");

module.exports = function(app){
    let views = `${__dirname}/views`;

    //MAIN
    app.get("/", (req, res)=>{res.sendFile(`${views}/main/index.html`)});
    app.get("/style", (req, res)=>{res.sendFile(`${views}/main/index.css`)});

    //WRITING
    app.get("/writing/style", (req, res)=>{res.sendFile(`${views}/writing/index.css`)});
    app.get("/writing/code", (req, res)=>{res.sendFile(`${views}/writing/index.js`)});
    app.get("/writing/comments/:article", writing.getComments);
    app.post("/writing/comments", writing.createComment);
    app.get("/writing/directories", writing.listDirectories);

    //BLOG
    app.get("/blog/style", (req, res)=>{res.sendFile(`${views}/blog/index.css`)});
    app.get("/blog/new", (req, res)=>{res.sendFile(`${views}/blog/new.html`)});
    app.post("/blog/new", blog.create);
    app.get("/blog/retrieve", blog.getBlogs);
    app.get("/blog/json/:id", blog.getBlog);
    app.get("/blog/:id", (req, res)=>{res.sendFile(`${views}/blog/index.html`)});

    //IMAGES
    app.get("/images/subline", (req, res)=>{res.sendFile(`${views}/images/subline.png`)});
    app.get("/images/budgeteer", (req, res)=>{res.sendFile(`${views}/images/budgeteer.jpeg`)});
    app.get("/images/sudoku", (req, res)=>{res.sendFile(`${views}/images/sudoku.png`)});
    app.get("/images/birthday", (req, res)=>{res.sendFile(`${views}/images/birthday.jpg`)});
    app.get("/images/market", (req, res)=>{res.sendFile(`${views}/images/market.jpeg`)});
    app.get("/images/web", (req, res)=>{res.sendFile(`${views}/images/webIcon.jpg`)});
    app.get("/images/html5", (req, res)=>{res.sendFile(`${views}/images/html5.png`)});
    app.get("/images/blacklist", (req, res)=>{res.sendFile(`${views}/images/blacklist.png`)});

    //SUDOKU
    app.get("/sudoku", (req, res)=>{res.sendFile(`${views}/sudoku/index.html`)});
    app.get("/sudoku/style", (req, res)=>{res.sendFile(`${views}/sudoku/index.css`)});
    app.get("/sudoku/code", (req, res)=>{res.sendFile(`${views}/sudoku/index.js`)});

    //BIRTHDAY PARADOX
    app.get("/birthdayparadox", (req, res)=>{res.sendFile(`${views}/birthdayParadox/index.html`)});
    app.get("/birthdayparadox/style", (req, res)=>{res.sendFile(`${views}/birthdayParadox/index.css`)});
    app.get("/birthdayparadox/code", (req, res)=>{res.sendFile(`${views}/birthdayParadox/index.js`)});

    //GALLERY
    app.get("/gallery/style", (req, res)=>{res.sendFile(`${views}/gallery/index.css`)});
    app.get("/gallery", (req, res)=>{res.sendFile(`${views}/gallery/galleries.html`)});
    app.get("/gallery/new", (req, res)=>{res.sendFile(`${views}/gallery/new.html`)});
    app.post("/gallery/new", gallery.create);
    app.get("/gallery/retrieve", gallery.getGalleries);
    app.get("/gallery/json/:id", gallery.getGallery);
    app.get("/gallery/:id", (req, res)=>{res.sendFile(`${views}/gallery/index.html`)});

    //LEARN
    app.get("/learn/style", (req, res)=>{res.sendFile(`${views}/learn/index.css`)});
    
    app.get("/learn/courses/new", (req, res)=>{res.sendFile(`${views}/learn/newCourse.html`)});
    app.post("/learn/courses/new", learn.createCourse);
    app.get("/learn/courses/json", learn.getCourses);
    app.get("/learn/courses/:id", (req, res)=>{res.sendFile(`${views}/learn/course.html`)});
    app.get("/learn", (req, res)=>{res.sendFile(`${views}/learn/courses.html`)});

    app.get("/learn/lectures/new", (req, res)=>{res.sendFile(`${views}/learn/newLecture.html`)});
    app.post("/learn/lectures/new", learn.createLecture);
    app.get("/learn/lectures/json/:id", learn.getLectures);
    app.get("/learn/lectures/:id", (req, res)=>(res.sendFile(`${views}/learn/lecture.html`)));
    app.get("/learn/lectures/json/one/:id", learn.getLecture);

    app.post("/htmltest", (req, res)=>{res.send(`Hi ${req.body.name} from ${req.body.place}`)});

    //CONTENT
    app.get("/thumbNails/*", (req, res)=>{res.sendFile(`${__dirname}${req.url}`)});
    app.get("/documents/*", (req, res)=>{res.download(`${__dirname}${req.url}`)});
    app.get("/galleryImages/*", (req, res)=>{res.sendFile(`${__dirname}${req.url}`)});
}