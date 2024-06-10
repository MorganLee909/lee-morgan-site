const gallery = require("./controllers/gallery.js");
const blog = require("./controllers/blog.js");
const currency = require("./controllers/currency.js");
const tracker = require("./controllers/tracker.js");

module.exports = function(app){
    let views = `${__dirname}/views`;

    //MAIN
    app.get("/", (req, res)=>{res.sendFile(`${views}/main/index.html`)});
    app.get("/style", (req, res)=>{res.sendFile(`${views}/main/index.css`)});

    //RESUME
    app.get("/resume", (req, res)=>{res.sendFile(`${views}/resume/resume.html`)});
    app.get("/resume/style", (req, res)=>{res.sendFile(`${views}/resume/resume.css`)});

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
    app.get("/images/bitchute", (req, res)=>{res.sendFile(`${views}/images/bitchute.png`)});
    app.get("/images/rumble", (req, res)=>{res.sendFile(`${views}/images/rumble.png`)});
    app.get("/images/covid", (req, res)=>{res.sendFile(`${views}/images/covid.jpeg`)});
    app.get("/images/currency", (req, res)=>res.sendFile(`${views}/images/currency.jpeg`));
    app.get("/images/favicon", (req, res)=>res.sendFile(`${views}/images/favicon.ico`));
    app.get("/images/plagiarism", (req, res)=>res.sendFile(`${views}/images/plagiarism.jpeg`));
    app.get("/images/uaflag", (req, res)=>res.sendFile(`${views}/images/uaFlag.webp`));
    app.get("/images/cosphere", (req, res)=>res.sendFile(`${views}/images/logo.svg`));
    app.get("/images/tetris", (req, res)=>res.sendFile(`${views}/images/tetris.webp`));

    //SUDOKU
    app.get("/sudoku", (req, res)=>{res.sendFile(`${views}/sudoku/index.html`)});
    app.get("/sudoku/style", (req, res)=>{res.sendFile(`${views}/sudoku/index.css`)});
    app.get("/sudoku/code", (req, res)=>{res.sendFile(`${views}/sudoku/index.js`)});

    //BIRTHDAY PARADOX
    app.get("/birthdayparadox",(req, res)=>{res.sendFile(`${views}/birthdayParadox/index.html`)}); 
    app.get("/birthdayparadox/style", (req, res)=>{res.sendFile(`${views}/birthdayParadox/index.css`)});
    app.get("/birthdayparadox/code", (req, res)=>{res.sendFile(`${views}/birthdayParadox/index.js`)});

    //GALLERY
    app.get("/gallery/style", (req, res)=>{res.sendFile(`${views}/gallery/index.css`)});
    app.get("/gallery", (req, res)=>{res.sendFile(`${views}/gallery/galleries.html`)});
    app.get("/gallery/new", (req, res)=>{res.sendFile(`${views}/gallery/new.html`)});
    app.post("/gallery/new", gallery.create);
    app.get("/gallery/retrieve", gallery.getGalleries);
    app.get("/gallery/edit/:id", (req, res)=>{res.sendFile(`${views}/gallery/editGallery.html`)});
    app.post("/gallery/update/:id", gallery.updateGallery);
    app.get("/gallery/json/:id", gallery.getGallery);
    app.get("/gallery/:id", (req, res)=>{res.sendFile(`${views}/gallery/index.html`)});

    //CURRENCY
    app.get("/currency/new", (req, res)=>{res.sendFile(`${views}/currency/new.html`)});
    
    app.post("/currency", currency.create);
    app.get("/currency/data", currency.getData);

    //CONTENT
    app.get("/thumbNails/*", (req, res)=>{res.sendFile(`${__dirname}${req.url}`)});
    app.get("/galleryImages/*", (req, res)=>{res.sendFile(`${__dirname}${req.url}`)});
    app.get("/currencyimages/*", (req, res)=>res.sendFile(`${__dirname}${req.url}`));

    //TRACKER
    app.get("/tracker", (req, res)=>res.sendFile(`${views}/timeTracker/tracker.html`));
    app.post("/tracker", tracker.create);
    app.put("/tracker", tracker.update);

    app.get("/tetris", (req, res)=>res.sendFile(`${views}/tetris/tetris-min.html`));
    app.get("/tetris/music", (req, res)=>res.sendFile(`${views}/tetris/music.mp3`));
}
