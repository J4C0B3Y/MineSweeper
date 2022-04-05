// a=1 b=2 c=3 d=4 e=5 f=6 g=7 h=8 i=bomb j=blank
// A=shown a=hidden 

var board;
var flagged;
var mineRatio = 20;
var started = false;

function generate(width, height){
    board = Array.apply(null, Array(width)).map(function(){ return Array.apply(null, Array(height)).map(String.prototype.valueOf, "j")})
    flagged = Array.apply(null, Array(width)).map(function(){ return Array.apply(null, Array(height)).map(Boolean.prototype.valueOf, false)})

    for (let i = 0; i < Math.ceil((width*height)*(mineRatio*0.01)); i++) {
        board[between(0, width-1)][between(0, height-1)] = "i"
    }
    
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if(board[x][y].toLowerCase() != "i") continue

            let cells = [[x-1,x,x+1],[y-1,y,y+1]]

            for (let sx = 0; sx < cells[0].length; sx++) {
                for (let sy = 0; sy < cells[1].length; sy++) {
                    if(cells[0][sx] == x && cells[1][sy] == y) continue
                    if(!isInBounds(cells[0][sx], cells[1][sy], board.length-1, board[x].length-1)) continue
                    board[cells[0][sx]][cells[1][sy]] = add(board[cells[0][sx]][cells[1][sy]])
                }
            }
        }
    }

}

function start(x, y){
    started = true;
    generate(x, y)
    if(typeof update == "function") update()
}

function click(x, y){
    if(!started || board[x][y].toUpperCase() == board[x][y] || flagged[x][y]) return
    if(board[x][y].toLowerCase() == "i") return end()



    if(typeof update == "function") update()
}

function flag(x, y){
    if(!started || board[x][y].toUpperCase() == board[x][y]) return
    flagged[x][y] = !flagged[x][y]
    board[x][y] = board[x][y].toUpperCase()

    if(typeof update == "function") update()
}

function end(){
    started = false;

    if(typeof update == "function") update()
}

function isInBounds(x, y, maxX, maxY){
    return x >= 0 && x <= maxX && y >= 0 && y <= maxY
}

function win(){

}

function solveAll(){
    if(!started) return

    for (let x = 0; x < board.length; x++) {
        for (let x = 0; x < board[x].length; x++) {
            board[x][y].toLowerCase() == "i" ? flag(x, y) : board[x][y] = board[x][y].toUpperCase()
        } 
    }

    if(typeof update == "function") update()
}

function solveStep(){
    if(!started) return

    if(boardString() == boardString().toUpperCase()){
        let blankPocket = findLargestBlankPocket()
        
        for (let i = 0; i < pocket.length; i++) {
            let cell = pocket[i].split(',')
            click(cell[0], cell[1])
        }
    }

    if(typeof update == "function") update()
}

function boardString(){
    let output = ""

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            output+=board[x][y]
        }
    }

    return output
}

function blankArray(){
    let blank = Array.apply(null, Array(board.length)).map(function(){ return Array.apply(null, Array(board[0].length)).map(Boolean.prototype.valueOf, true)})

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if(board[x][y].toLowerCase() != "j") blank[x][y] = false;
        }
    }

    return blank
}

function findBlankPockets(){
    let check = blankArray()

    let pockets = []
    let visited = new Set
 
    for(let x = 0; x < check.length; x++){
        for(let y = 0; y < check[x].length; y++){
            if(visited.has(`${x},${y}`)) continue
            let pocket = traverse(x, y)
            if(pocket) pockets.push(pocket);
        } 
    }

    function traverse(x, y, current = []){
        if(!isInBounds(x, y, check.length-1, check[0].length-1)) return
        if(!check[x][y] || visited.has(`${x},${y}`)) return

        current.push(`${x},${y}`)
        visited.add(`${x},${y}`)

        traverse(x, y - 1, current)
        traverse(x + 1, y, current)
        traverse(x, y + 1, current)
        traverse(x - 1, y, current)

        
        return current
    }

    return pockets
}

function findLargestBlankPocket(){
    let pockets = findBlankPockets()
    let pocket;
    let length = 0

    for (let i = 0; i < pockets.length; i++) {
        if(pockets[i].length >= length){
            if(pockets[i].length == length && Math.random() > 0.5) continue
            pocket = pockets[i]
            length = pockets[i].length
        }
    }

    return pocket
}