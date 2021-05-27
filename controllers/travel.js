const fs = require("fs");

module.exports = {
    listDirectories: function(req, res){
        let traverse = (dir)=>{
            let contents = fs.readdirSync(dir);

            let array = [];
            for(let i = 0; i < contents.length; i++){
                let route = `${dir.substring(dir.indexOf("/content") + 8)}/${contents[i]}`;
                if(contents[i].includes(".") === false){
                    array.push({
                        name: contents[i],
                        route: route,
                        contents: traverse(`${dir}/${contents[i]}`)
                    });
                }else{
                    array.push({
                        src: route
                    });
                }
            }

            return array;
        }

        return res.json(traverse(`${__dirname}/../content/travel`));
    },

    getImages: function(req, res){
        let path = req.originalUrl
            .split("/")
            .slice(3)
            .join("/");

        let pictures = fs.readdirSync(`${__dirname}/../content/travel/${path}`);

        let response = [];
        
        for(let i = 0; i < pictures.length; i++){
            response.push(`/travel/${path}/${pictures[i]}`);
        }

        return res.json(response);
    }
}