const gallery = require("./controllers/gallery.js");
const learn = require("./controllers/learn.js");
const blog = require("./controllers/blog.js");
const covid = require("./controllers/covid.js");
const currency = require("./controllers/currency.js");

const visit = require("./middleware.js").visit;

module.exports = function(app){
    let views = `${__dirname}/views`;

    //MAIN
    app.get("/", visit, (req, res)=>{res.sendFile(`${views}/main/index.html`)});
    app.get("/style", (req, res)=>{res.sendFile(`${views}/main/index.css`)});

    //RESUME
    app.get("/resume", visit, (req, res)=>{res.sendFile(`${views}/resume/resume.html`)});
    app.get("/resume/style", (req, res)=>{res.sendFile(`${views}/resume/resume.css`)});

    //BLOG
    app.get("/blog/style", (req, res)=>{res.sendFile(`${views}/blog/index.css`)});
    app.get("/blog/new", visit, (req, res)=>{res.sendFile(`${views}/blog/new.html`)});
    app.post("/blog/new", blog.create);
    app.get("/blog/retrieve", blog.getBlogs);
    app.get("/blog/json/:id", blog.getBlog);
    app.get("/blog/:id", visit, (req, res)=>{res.sendFile(`${views}/blog/index.html`)});

    //IMAGES
    app.get("/images/subline", (req, res)=>{res.sendFile(`${views}/images/subline.png`)});
    app.get("/images/budgeteer", (req, res)=>{res.sendFile(`${views}/images/budgeteer.jpeg`)});
    app.get("/images/sudoku", (req, res)=>{res.sendFile(`${views}/images/sudoku.png`)});
    app.get("/images/birthday", (req, res)=>{res.sendFile(`${views}/images/birthday.jpg`)});
    app.get("/images/market", (req, res)=>{res.sendFile(`${views}/images/market.jpeg`)});
    app.get("/images/web", (req, res)=>{res.sendFile(`${views}/images/webIcon.jpg`)});
    app.get("/images/html5", (req, res)=>{res.sendFile(`${views}/images/html5.png`)});
    app.get("/images/blacklist", (req, res)=>{res.sendFile(`${views}/images/blacklist.png`)});
    app.get("/images/bitchute", (req, res)=>{res.sendFile(`${views}/images/bitchute.png`)});
    app.get("/images/rumble", (req, res)=>{res.sendFile(`${views}/images/rumble.png`)});
    app.get("/images/covid", (req, res)=>{res.sendFile(`${views}/images/covid.jpeg`)});
    app.get("/images/currency", (req, res)=>res.sendFile(`${views}/images/currency.jpeg`));

    //SUDOKU
    app.get("/sudoku", visit, (req, res)=>{res.sendFile(`${views}/sudoku/index.html`)});
    app.get("/sudoku/style", (req, res)=>{res.sendFile(`${views}/sudoku/index.css`)});
    app.get("/sudoku/code", (req, res)=>{res.sendFile(`${views}/sudoku/index.js`)});

    //BIRTHDAY PARADOX
    app.get("/birthdayparadox", visit,(req, res)=>{res.sendFile(`${views}/birthdayParadox/index.html`)}); 
    app.get("/birthdayparadox/style", (req, res)=>{res.sendFile(`${views}/birthdayParadox/index.css`)});
    app.get("/birthdayparadox/code", (req, res)=>{res.sendFile(`${views}/birthdayParadox/index.js`)});

    //GALLERY
    app.get("/gallery/style", (req, res)=>{res.sendFile(`${views}/gallery/index.css`)});
    app.get("/gallery", visit, (req, res)=>{res.sendFile(`${views}/gallery/galleries.html`)});
    app.get("/gallery/new", (req, res)=>{res.sendFile(`${views}/gallery/new.html`)});
    app.post("/gallery/new", gallery.create);
    app.get("/gallery/retrieve", gallery.getGalleries);
    app.get("/gallery/edit/:id", visit, (req, res)=>{res.sendFile(`${views}/gallery/editGallery.html`)});
    app.post("/gallery/update/:id", gallery.updateGallery);
    app.get("/gallery/json/:id", gallery.getGallery);
    app.get("/gallery/:id", visit, (req, res)=>{res.sendFile(`${views}/gallery/index.html`)});

    //LEARN
    app.get("/learn/style", (req, res)=>{res.sendFile(`${views}/learn/index.css`)});
    
    app.get("/learn/courses/new", visit, (req, res)=>{res.sendFile(`${views}/learn/newCourse.html`)});
    app.post("/learn/courses/new", learn.createCourse);
    app.get("/learn/courses/json", learn.getCourses);
    app.get("/learn/courses/:id", visit, (req, res)=>{res.sendFile(`${views}/learn/course.html`)});
    app.get("/learn", visit, (req, res)=>{res.sendFile(`${views}/learn/courses.html`)});
    app.get("/learn/answers/new/", (req, res)=>{res.sendFile(`${views}/learn/newAnswer.html`)});

    app.get("/learn/lectures/new", visit, (req, res)=>{res.sendFile(`${views}/learn/newLecture.html`)});
    app.post("/learn/lectures/new", learn.createLecture);
    app.get("/learn/lectures/edit/:id", visit, (req, res)=>{res.sendFile(`${views}/learn/editLecture.html`)});
    app.post("/learn/lectures/edit/:id", learn.updateLecture);
    app.delete("/learn/lectures/:id", learn.removeLecture);
    app.get("/learn/lectures/json/:id", learn.getLectures);
    app.get("/learn/lectures/:id", visit, (req, res)=>{res.sendFile(`${views}/learn/lecture.html`)});
    app.get("/learn/lectures/json/one/:id", learn.getLecture);

    app.post("/learn/questions/create", learn.createQuestion);
    app.post("/learn/answers/create", learn.createAnswer);

    app.post("/htmltest", visit, (req, res)=>{res.send(`Hi ${req.body.name} from ${req.body.place}`)});

    //COVID
    app.get("/covid", visit, (req, res)=>{res.sendFile(`${views}/covid/covid.html`)});
    app.get("/covid/style", (req, res)=>{res.sendFile(`${views}/covid/covid.css`)});
    app.post("/covid", visit, covid.data);

    //CURRENCY
    app.get("/currency/new", (req, res)=>{res.sendFile(`${views}/currency/new.html`)});
    
    app.post("/currency", currency.create);
    app.get("/currency/data", currency.getData);

    //CONTENT
    app.get("/thumbNails/*", (req, res)=>{res.sendFile(`${__dirname}${req.url}`)});
    app.get("/documents/*", (req, res)=>{res.download(`${__dirname}${req.url}`)});
    app.get("/galleryImages/*", (req, res)=>{res.sendFile(`${__dirname}${req.url}`)});
    app.get("/currencyimages/*", (req, res)=>res.sendFile(`${__dirname}${req.url}`));
}