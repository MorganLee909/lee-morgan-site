let arr = [];
let emptyX = [];
let emptyY = [];
let count = 0;

solve = ()=>{
    getInputs();
    recurse(0);
    fillIn();
}

getInputs = ()=>{
    let tbody = document.querySelector("tbody");
    
    for(let row of tbody.children){
        rowArr = [];
        for(let td of row.children){
            let rowValue = td.children[0].value;
            if(rowValue === ""){
                rowArr.push(0);
            }else{
                rowArr.push(parseInt(rowValue));
            }
        }

        arr.push(rowArr);
    }

    //Make a note of all empty spots
    for(let y = 0; y < 9; y++){
        for(let x = 0; x < 9; x++){
            if(arr[y][x] === 0){
                emptyY.push(y);
                emptyX.push(x);
            }
        }
    }
}

recurse = (emptyIndex)=>{
    count++;
    if(emptyIndex === emptyX.length){
        return true;
    }

    for(let n = 1; n <= 9; n++){
        if(isValid(emptyY[emptyIndex], emptyX[emptyIndex], n)){
            arr[emptyY[emptyIndex]][emptyX[emptyIndex]] = n;
            let isDone = recurse(emptyIndex + 1);
            if(isDone){
                return true;
            }
        }
    }

    arr[emptyY[emptyIndex]][emptyX[emptyIndex]] = 0;  
}


isValid = (y, x, n)=>{
    for(let y2 = 0; y2 < 9; y2++){
        if(arr[y2][x] === n){
            return false;
        }
    }

    for(let x2 = 0; x2 < 9; x2++){
        if(arr[y][x2] === n){
            return false;
        }
    }

    let squareInputs = [getArrForBox(y), getArrForBox(x)];
    for(let i of squareInputs[0]){
        for(let j of squareInputs[1]){
            if(arr[i][j] === n){
                return false;
            }
        }
    }

    return true;
},

getArrForBox = (coord)=>{
    let coords = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    for(let set of coords){
        for(let num of set){
            if(num === coord){
                return set;
            }
        }
    }
}

fillIn = ()=>{
    let tbody = document.querySelector("tbody");

    for(let i = 0; i < 9; i++){
        let row = tbody.children[i];
        for(let j = 0; j < 9; j++){
            row.children[j].children[0].value = arr[i][j];
        }
    }
}

reset = ()=>{
    let tbody = document.querySelector("tbody");

    for(let row of tbody.children){
        for(let td of row.children){
            td.children[0].value = "";
        }
    }

    arr = [];
    emptyX = [];
    emptyY = [];
    count = 0;
}

document.getElementById("solve").onclick = ()=>{solve()};
document.getElementById("reset").onclick = ()=>{reset()};