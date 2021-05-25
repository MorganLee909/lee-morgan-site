const fs = require("fs");

module.exports = (app)=>{
    let createHTML = (dir)=>{
        let article = fs.readFileSync(`${dir}/article.txt`).toString().split("\n");
        let meta = fs.readFileSync(`${dir}/meta.txt`).toString().split("\n");
        let route = dir.substring(dir.indexOf("/content/writing/") + 17).replace(/\//g, "-");

        let html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>${meta[0]}</title>
                <link rel="stylesheet" href="/writing/style">
            </head>
            <body>
                <div class="article">
                    <h1>${meta[0]}</h1>

                    <h3>${meta[1]}</h3>
        `;

        for(let i = 0; i < article.length; i++){
            if(article[i] === "") continue;

            html += `<p class="paragraph">${article[i]}</p>`;
        }

        html += `
                    </div>

                    <form id="createComment">
                        <h2>Add Comment</h2>

                        <label>Display Name:
                            <input id="nameInput" type="text">
                        </label>

                        <label>Comment:
                            <textarea id="commentInput" rows="10" columns="80" required></textarea>
                        </label>

                        <input type="Submit" value="SUBMIT">

                        <input id="articleInput" type="hidden" article="${route}">
                    </form>

                    <div id="comments">
                        <h2>Comments</h2>
                        
                        <template id="comment">
                            <div class="comment">
                                <div>
                                    <h3></h3>

                                    <p></p>
                                </div>
                                
                                <p></p>
                            </div>
                        </template>
                    </div>

                    <script src="/writing/code"></script>
                </body>
            </html>
        `;

        fs.writeFileSync(`${dir}/article.html`, html);
    }

    let createRoute = (dir)=>{
        let route = dir.substring(dir.indexOf("/content/writing/") + 8);

        let contents = fs.readdirSync(dir);
        for(let i = 0; i < contents.length; i++){
            if(contents[i].includes(".jpg") === true){
                app.get(`${route}/${contents[i]}`, (req, res)=>{res.sendFile(`${__dirname}/content/route/${contents[i]}`)});
            }
        }

        app.get(route, (req, res)=>{res.sendFile(`${__dirname}/content/${route}/article.html`)});
    }

    let traverseDirectory = (dir)=>{
        let contents = fs.readdirSync(dir);

        let hasHtml = false;
        for(let i = 0; i < contents.length; i++){
            if(contents[i].includes(".") === false) traverseDirectory(`${dir}/${contents[i]}`);
            if(contents[i].includes(".html") === true) hasHtml = true;
        }

        if(contents.includes("article.txt") === true){
            if(hasHtml === false) createHTML(dir);
            createRoute(dir);
        }
    }

    traverseDirectory(`${__dirname}/content/writing`);
}