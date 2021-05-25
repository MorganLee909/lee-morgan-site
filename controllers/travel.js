const fs = require("fs");

module.exports = {
    listDirectories: function(req, res){
        // const searchDir = function(path, currentObject){
        //     let response = fs.readdirSync(path);

        //     for(let i = 0; i < response.length; i++){
        //         let newPath = `${path}/${response[i]}`;

        //         let newObject = ({
        //             name: response[i].replace(/-/g, " "),
        //             path: newPath.substring(newPath.indexOf("/travel") + 7, newPath.length),
        //             contents: []
        //         });

        //         if(response[i].includes(".") === false){
        //             currentObject.contents.push(newObject);
        //             searchDir(newPath, newObject);
        //         }
        //     }

        //     return currentObject;
        // }

        // let result = searchDir(`${__dirname}/../content`, {
        //     contents: []
        // });

        // let array = [];
        // for(let i = 0; i < result.contents.length; i++){
        //     if(result.contents[i].name === "travel"){
        //         array = result.contents[i].contents;
        //         break;
        //     }
        // }

        // return res.json(array);

        let array = [];

        let traverse = (dir)=>{
            let contents = fs.readdirSync(dir);

            let newArray = [];
            let hasSubDir = false;
            for(let i = 0; i < contents.length; i++){
                if(contents[i].includes(".") === false){
                    hasSubDir = true;
                    let newPath = `${dir}/${contents[i]}`;

                    newArray.push({
                        name: contents[i],
                        img: ""
                    });

                    let inner = fs.readdirSync(newPath);
                    for(let i = 0; i < inner.length; i++){
                        if(inner[i].includes(".jpg")){
                            newArray.img = `${newPath}/${inner[i]}`;
                            break;
                        }
                    }

                    traverse(newPath);
                }
            }

            if(hasSubDir === false){
                
            }

            return newArray;
        }

        let array = traverse(`${__dirname}/../content/travel`);
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