fetch("/writing/comments/touchscreens")
    .then(response => response.json())
    .then((response)=>{
        if(typeof(response) === "string"){
            console.log(response);
        }else{
            let comments = document.getElementById("comments");
            let template = document.getElementById("comment").content.children[0];

            let dateOptions = {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            };

            for(let i = 0; i < response.length; i++){
                let comment = template.cloneNode(true);
                comment.children[0].children[0].innerText = response[i].name;
                comment.children[0].children[1].innerText = new Date(response[i].date).toLocaleString("en-US", dateOptions);
                comment.children[1].innerText = response[i].content;
                comments.appendChild(comment);
            }
        }
    })
    .catch((err)=>{
        console.log(err);
    });

    createComment = ()=>{
        event.preventDefault();

        let data = {
            article: document.getElementById("articleInput").getAttribute("article"),
            name: document.getElementById("nameInput").value,
            content: document.getElementById("commentInput").value,
            date: new Date()
        };

        fetch("/writing/comments", {
            method: "post",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((response)=>{
                if(typeof(response) === "string"){
                    console.log(response);
                }else{
                    
                    let comments = document.getElementById("comments");
                    let comment = document.getElementById("comment").content.children[0].cloneNode(true);

                    let dateOptions = {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    };

                    comment.children[0].children[0].innerText = response.name;
                    comment.children[0].children[1].innerText = new Date(response.date).toLocaleString("en-US", dateOptions);
                    comment.children[1].innerText = response.content;
                    comments.insertBefore(comment, comments.children[1]);
                }
            })
            .catch((err)=>{
                console.log(err);
            });
    }

document.getElementById("createComment").onsubmit = ()=>{createComment()};