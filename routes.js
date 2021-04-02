module.exports = function(app){
    app.get("/", (req, res)=>{res.sendFile(`${__dirname}/views/main/index.html`)});
    app.get("/style", (req, res)=>{res.sendFile(`${__dirname}/views/main/index.css`)});
}