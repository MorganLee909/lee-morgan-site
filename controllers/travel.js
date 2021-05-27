const fs = require("fs");

module.exports = {
    listDirectories: function(req, res){
        let traverse = (dir)=>{
            let contents = fs.readdirSync(dir);

            let array = [];
            for(let i = 0; i < contents.length; i++){
                if(contents[i].includes(".") === false){
                    array.push({
                        name: contents[i],
                        contents: traverse(`${dir}/${contents[i]}`)
                    });
                }else{
                    array.push({
                        src: `${dir.substring(dir.indexOf("/travel") + 7)}/${contents[i]}`
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
            .slice(2)
            .join("/");

        let pictures = fs.readdirSync(`${__dirname}/content/${path}`);

        let response = [];
        
        for(let i = 0; i < pictures.length; i++){
            response.push(`/${path}/${pictures[i]}`);
        }

        return res.json(response);
    }
}