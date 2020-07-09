//define the class pieces
class piece {
    constructor(type, color, i, j) {
    //initial status of all pieces
        this.type = type
        this.color = color
        this.i = i
        this.j = j
        //all pieces default
        this.moved = false //king-rook-pawn
    }
}

//define the class square
class square {
    constructor(color) {
        this.color = color
        //square default
        this.status = new piece("none", "none", -1, -1)
    }
}

class game {
    constructor() {
    //game default
    this.board = new Array(8)
    this.saved_boards = []
    this.saved_moves = []
    this.alive_white = []
    this.alive_black = []
    this.eaten_white = []
    this.eaten_black = []
    this.turn = "white"
    
    //transform board into a matrix of squares
    for (let i=0; i<8; i++) {
        this.board[i] = new Array(8)
        for (let j=0; j<8; j++) {
            this.board[i][j] = new square("black")
            if (i%2 === 0 && j%2 === 0) {
                this.board[i][j].color = "white"
            }
        }
    }

    //fill the pieces in the squares of the board
    this.board[0][0].status = new piece("rook", "black", 0, 0)
    this.board[0][1].status = new piece("knight", "black", 0, 1)
    this.board[0][2].status = new piece("bishop", "black", 0, 2)
    this.board[0][3].status = new piece("queen", "black", 0, 3)
    this.board[0][4].status = new piece("king", "black", 0, 4)
    this.board[0][5].status = new piece("bishop", "black", 0, 5)
    this.board[0][6].status = new piece("knight", "black", 0, 6)
    this.board[0][7].status = new piece("rook", "black", 0, 7)

    for (let j=0; j<8; j++) {
        this.board[1][j].status = new piece("pawn", "black", 1, j)
    }

    for (let j=0; j<8; j++) {
        this.board[6][j].status = new piece("pawn", "white", 6, j)
    }

    this.board[7][0].status = new piece("rook", "white", 7, 0)
    this.board[7][1].status = new piece("knight", "white", 7, 1)
    this.board[7][2].status = new piece("bishop", "white", 7, 2)
    this.board[7][3].status = new piece("queen", "white", 7, 3)
    this.board[7][4].status = new piece("king", "white", 7, 4)
    this.board[7][5].status = new piece("bishop", "white", 7, 5)
    this.board[7][6].status = new piece("knight", "white", 7, 6)
    this.board[7][7].status = new piece("rook", "white", 7, 6)

    //start filling the saved_boards list with a clone of the first configuration
    var boardClone = this.cloneBoard(this.board)
    this.saved_boards.push(boardClone)
    }

    //clones a given board
    cloneBoard(board) {
        var newBoard = Array(8)
        //transform board into a matrix of squares
        for (let i=0; i<8; i++) {
            newBoard[i] = new Array(8)
            for (let j=0; j<8; j++) {
                newBoard[i][j] = new square("black")
                if (i%2 === 0 && j%2 === 0) {
                    newBoard[i][j].color = "white"
                }
            }
        }
        //fill the pieces
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                newBoard[i][j].status = new piece(board[i][j].status.type, board[i][j].status.color, board[i][j].status.i, board[i][j].status.j)
                newBoard[i][j].status.moved = board[i][j].status.moved
            }
        }
        return newBoard
    }

    //check if a position is threatened (posi is a size 2 Array), return [bool, position of piece_threatening]
    isThreatened(board, posi, saved_moves, turn) {
        var enemy = ""
        if (turn === "white") {
            enemy = "black"
        }
        else {
            enemy = "white"
        }
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                if (this.goodMove(board, [i, j, posi[0], posi[1]], saved_moves, enemy)) {
                    return [true, [i, j]]
                }
            }
        }
        return [false, [-1, -1]]
    }

    //check if the king is threatened (turn = king), return [bool, position of piece_checking]
    isChecked(board, saved_moves, turn) {
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                if (board[i][j].status.type === "king" && board[i][j].status.color === turn) {
                    var answer = this.isThreatened(board, [i, j], saved_moves, turn)
                    return answer
                }
            }
        }   
    }

    //number of pieces checking the player's king (turn = king)
    nbChecked(board, saved_moves, turn) {
        var nb = 0
        var boardClone = this.cloneBoard(board)
        var checking = [-1, -1]
        var search = this.isChecked(boardClone, saved_moves, turn)[0]
        while (search) {
            nb = nb + 1
            checking = this.isChecked(boardClone, saved_moves, turn)[1]
            boardClone[checking[0]][checking[1]].status.type = "none"
            boardClone[checking[0]][checking[1]].status.color = "none"
            boardClone[checking[0]][checking[1]].status.i = -1
            boardClone[checking[0]][checking[1]].status.j = -1
            search = this.isChecked(boardClone, saved_moves, turn)[0]
        }
        return nb
    }

    //check if a piece at a position is frozen (posi is a size 2 Array)
    isFrozen(board, posi, saved_moves, turn) {
        var before = this.nbChecked(board, saved_moves, turn)
        var boardClone = this.cloneBoard(board)
        boardClone[posi[0]][posi[1]].status.type = "none"
        boardClone[posi[0]][posi[1]].status.color = "none"
        boardClone[posi[0]][posi[1]].status.i = -1
        boardClone[posi[0]][posi[1]].status.j = -1
        var after = this.nbChecked(boardClone, saved_moves, turn)
        if (after > before) {
            return true
        }
        else {
            return false
        }
    }

    //goodMove only states where a piece can go but doesn't say if it should (legally) go there or not (move is a size 4 Array that contains starting and ending position)
    goodMove(board, move, saved_moves, turn) {
        //check if in the board
        if (move[0]>=0 && move[0]<=7 && move[1]>=0 && move[1]<=7 && move[2]>=0 && move[2]<=7 && move[3]>=0 && move[3]<=7) {
            //check if start color is turn and end color is not turn or rook of color turn
            if (board[move[0]][move[1]].status.color === turn && board[move[2]][move[3]].status.color !== turn ) {
                //what is the start type:

                //king
                if (board[move[0]][move[1]].status.type === "king") {
                    //vertical move
                    if (move[1] === move[3]) {
                        if (move[0] === move[2]+1 || move[0] === move[2]-1) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    //horizontal move
                    else if (move[0] === move[2]) {
                        if (move[1] === move[3]+1 || move[1] === move[3]-1) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    //North-East UP diagonal move
                    else if (move[3]-move[1] === 1 && move[2]-move[0] === -1) {
                        return true
                    }
                    //North-East DOWN diagonal move
                    else if (move[3]-move[1] === -1 && move[2]-move[0] === 1) {
                        return true
                    }
                    //North-West UP diagonal move
                    else if (move[3]-move[1] === -1 && move[2]-move[0] === -1) {
                        return true
                    }
                    //North-West DOWN diagonal move
                    else if (move[3]-move[1] === 1 && move[2]-move[0] === 1) {
                        return true
                    }
                    //invalid move
                    else {
                        return false
                    }
                }
                //queen
                else if (board[move[0]][move[1]].status.type === "queen") {
                    //vertical move
                    if (move[1] === move[3]) {
                        for(let i=Math.min(move[0], move[2])+1; i<Math.max(move[0], move[2]); i++) {
                            if (board[i][move[1]].status.type !== "none") {
                                return false
                            }
                        }
                        return true
                    }
                    //horizontal move
                    else if (move[0] === move[2]) {
                        for(let j=Math.min(move[1], move[3])+1; j<Math.max(move[1], move[3]); j++) {
                            if (board[move[0]][j].status.type !== "none") {
                                return false
                            }
                        }
                        return true
                    }
                    //North-East diagonal move
                    else if (move[0]+move[1] === move[2]+move[3]) {
                        for(let i=Math.max(move[0], move[2])-1; i>Math.min(move[0], move[2]); i--) {
                            for(let j=Math.min(move[1], move[3])+1; j<Math.max(move[1], move[3]); j++) {
                                if (board[i][j].status.type !== "none") {
                                    return false
                                }
                            }
                        }
                        return true
                    }
                    //North-West diagonal move
                    else if (move[0]-move[1] === move[2]-move[3]) {
                        for(let i=Math.min(move[0], move[2])+1; i<Math.max(move[0], move[2]); i++) {
                            for(let j=Math.min(move[1], move[3])+1; j<Math.max(move[1], move[3]); j++) {
                                if (board[i][j].status.type !== "none") {
                                    return false
                                }
                            }
                        }
                        return true
                    }
                    //invalid move
                    else {
                        return false
                    }
                }
                //rook
                else if (board[move[0]][move[1]].status.type === "rook") {
                    //vertical move
                    if (move[1] === move[3]) {
                        for(let i=Math.min(move[0], move[2])+1; i<Math.max(move[0], move[2]); i++) {
                            if (board[i][move[1]].status.type !== "none") {
                                return false
                            }
                        }
                        return true
                    }
                    //horizontal move
                    else if (move[0] === move[2]) {
                        for(let j=Math.min(move[1], move[3])+1; j<Math.max(move[1], move[3]); j++) {
                            if (board[move[0]][j].status.type !== "none") {
                                return false
                            }
                        }
                        return true
                    }
                    //invalid move
                    else {
                        return false
                    }
                }
                //bishop
                else if (board[move[0]][move[1]].status.type === "bishop") {
                    //North-East diagonal move
                    if (move[0]+move[1] === move[2]+move[3]) {
                        for(let i=Math.max(move[0], move[2])-1; i>Math.min(move[0], move[2]); i--) {
                            for(let j=Math.min(move[1], move[3])+1; j<Math.max(move[1], move[3]); j++) {
                                if (board[i][j].status.type !== "none") {
                                    return false
                                }
                            }
                        }
                        return true
                    }
                    //North-West diagonal move
                    else if (move[0]-move[1] === move[2]-move[3]) {
                        for(let i=Math.min(move[0], move[2])+1; i<Math.max(move[0], move[2]); i++) {
                            for(let j=Math.min(move[1], move[3])+1; j<Math.max(move[1], move[3]); j++) {
                                if (board[i][j].status.type !== "none") {
                                    return false
                                }
                            }
                        }
                        return true
                    }
                    //invalid move
                    else {
                        return false
                    }
                }
                //knight
                else if (board[move[0]][move[1]].status.type === "knight") {
                    //1->2
                    if (Math.abs(move[2]-move[0]) === 1 && Math.abs(move[3]-move[1]) === 2) {
                        return true
                    } 
                    //2->1
                    else if (Math.abs(move[2]-move[0]) === 2 && Math.abs(move[3]-move[1]) === 1) {
                        return true
                    }
                    //invalid move
                    else {
                        return false
                    }
                }
                //pawn
                else if (board[move[0]][move[1]].status.type === "pawn") {
                    //en passant

                    //white pawn, left en passant
                    if (turn === "white" && move[0] === 3 && move[2] === 2 && move[3] === move[1]-1 && saved_moves[saved_moves.length-1] === [1, move[1]-1, 3, move[1]-1]) {
                        return true
                    }
                    //white pawn, right en passant
                    else if (turn === "white" && move[0] === 3 && move[2] === 2 && move[3] === move[1]+1 && saved_moves[saved_moves.length-1] === [1, move[1]+1, 3, move[1]+1]) {
                        return true
                    }
                    //black pawn, left en passant
                    else if (turn === "black" && move[0] === 4 && move[2] === 5 && move[3] === move[1]-1 && saved_moves[saved_moves.length-1] === [6, move[1]-1, 4, move[1]-1]) {
                        return true
                    }
                    //black pawn, right en passant
                    else if (turn === "black" && move[0] === 4 && move[2] === 5 && move[3] === move[1]+1 && saved_moves[saved_moves.length-1] === [6, move[1]+1, 4, move[1]+1]) {
                        return true
                    }

                    //normal behavior

                    //white pawn
                    if (turn === "white") {
                        //if didn't move yet can make 2 steps
                        if (move[1] === move[3] && move[0]-move[2] === 2 && !(board[move[0]][move[1]].status.moved) && board[move[0]-1][move[1]].status.type === "none" && board[move[0]-2][move[1]].status.type === "none") {
                            return true
                        }
                        //move 1 step forward
                        else if (move[1] === move[3] && move[0]-move[2] === 1 && board[move[2]][move[3]].status.type === "none") {
                            return true
                        }
                        //diagonal eating
                        else if (move[0]-move[2] === 1 && Math.abs(move[1]-move[3]) === 1 && board[move[2]][move[3]].status.color === "black") {
                            return true
                        }
                        //invalid move
                        else {
                            return false
                        }
                    }
                    //black pawn
                    else {
                        //if didn't move yet can make 2 steps
                        if (move[1] === move[3] && move[2]-move[0] === 2 && !(board[move[0]][move[1]].status.moved) && board[move[0]+1][move[1]].status.type === "none" && board[move[0]+2][move[1]].status.type === "none") {
                            return true
                        }
                        //move 1 step forward
                        else if (move[1] === move[3] && move[2]-move[0] === 1 && board[move[2]][move[3]].status.type === "none") {
                            return true
                        }
                        //diagonal eating
                        else if (move[2]-move[0] === 1 && Math.abs(move[1]-move[3]) === 1 && board[move[2]][move[3]].status.color === "white") {
                            return true
                        }
                        //invalid move
                        else {
                            return false
                        }
                    }
                }
            }
            //invalid move
            else {
                return false
            }
        }
        //out of board
        else {
            return false
        }
    }

    //isPossible states if a piece should or not make the move according to chess rules
    //the order of the tests is very important
    isPossible(board, move, saved_moves, turn) {
        //trying to castle?
        if (board[move[0]][move[1]].status.type === "king" && board[move[0]][move[1]].status.color === turn && move[0] === move[2] && (move[1]-move[3] === 2 || move[1]-move[3] === -2) && board[move[2]][move[3]].status.type === "none") {
            // X if isChecked
            if (this.isChecked(board, saved_moves, turn)[0]) {
                return false
            }
            // X if king moved
            else if (board[move[0]][move[1]].status.moved) {
                return false
            }
            // X if rook moved
            //right tower
            else if (move[3] > move[1] && (board[move[0]][7].moved || board[move[0]][7].status.type !== "rook" || board[move[0]][7].status.color !== turn)) {
                return false
            }
            //left tower
            else if (move[3] < move[1] && (board[move[0]][0].moved || board[move[0]][0].status.type !== "rook" || board[move[0]][0].status.color !== turn)) {
                return false
            }
            //between king and rook should be empty and not threatened
            //right tower
            else if (move[3] > move[1] && (board[move[0]][move[1]+1].status.type !== "none" || board[move[0]][move[1]+2].status.type !== "none" || this.isThreatened(board, [move[0], move[1]+1], saved_moves, turn)[0] || this.isThreatened(board, [move[0], move[1]+2], saved_moves, turn)[0])) {
                return false
            }
            //left tower
            else if (move[3] < move[1] && (board[move[0]][move[1]-1].status.type !== "none" || board[move[0]][move[1]-2].status.type !== "none" || board[move[0]][move[1]-3].status.type !== "none" || this.isThreatened(board, [move[0], move[1]-1], saved_moves, turn)[0] || this.isThreatened(board, [move[0], move[1]-2], saved_moves, turn)[0] || this.isThreatened(board, [move[0], move[1]-3], saved_moves, turn)[0])) {
                return false
            }
            //if the player passed all the tests he deserves to castle
            else {
                return true
            }
        }
        //check if it's a good move
        else if (!(this.goodMove(board, move, saved_moves, turn))) {
            return false
        }
        //is the start frozen?
        else if (this.isFrozen(board,[move[0], move[1]], saved_moves, turn)) {
            return false
        }
        //if checked we can only move to an unchecked configuration
        else if (this.isChecked(board, saved_moves, turn)[0]) {
            //clone board, do the move and verify if the king is still threatened
            var boardClone = this.cloneBoard(board)
            this.doMove(boardClone, move, saved_moves, turn)
            if (this.isChecked(boardClone, saved_moves, turn)[0]) {
                return false
            }  
            else {
                return true
            }    
        }
        //the king shouldn't go to a threatened area
        else if (board[move[0]][move[1]].status.type === "king") {
            if (this.isThreatened(board, [move[2], move[3]], saved_moves, turn)[0]) {
                return false
            }
            else {
                return true
            }
        }
        //if nothing is wrong we have a possible move
        else {
            return true
        }
    } 

    //returns an Array of moves (size 4 Array)
    possibleMoves(board, saved_moves, turn) {
        var possible = []
        for(let i=0; i<8; i++) {
            for(let j=0; j<8; j++) {
                for(let k=0; k<8; k++) {
                    for(let l=0; l<8; l++) {
                        if (this.isPossible(board, [i, j, k, l], saved_moves, turn)) {
                            possible.push([i, j, k, l])
                        }
                    }
                }
            }
        }
        return possible
    }

    //mofifies the board after a move without asking if it's possible, just if it's good
    doMove(board, move, saved_moves, turn) {

        //////////////
        ///  FILL  ///
        //////////////

        //don't check if the move is possible (check if it's goodMove)
        //modify the board : type, color and position
        //if king, rook or pawn moves modify piece.moved

        //NB: if the move is castling be careful and if pawn on last line
    }

    //makes the move for this.board knowing this.turn and modifies the global variables of the class
    //never use it with a cloned board because it modifies the global variables of game class
    playerMove(move) {

        //////////////
        ///  FILL  ///
        //////////////

        //check if the move is possible
        //calls doMove()

        //modify this.eaten_white
        //modify this.eaten_black
        //modify this.alive_white
        //modify this.alive_black
        //add it to saved_boards
        //add move to saved_moves
        //change this.turn
        //search for the king and verify if isThreatened to modify this.check   
        
        //the above shouldn't be changed if the the move is not possible
    }

    //returns 0 if no one won, 1 if white won, 2 if black won
    ////////////////////////////////////
    ///A REVOIR et ajouter END GAME()///
    ////////////////////////////////////
    checkmate(board, saved_moves) {
        if (!(this.check)) {
            return 0
        }
        else {
            if (this.possibleMoves(board, saved_moves, "black") === []) {
                return 1
            }
            else if (this.possibleMoves(board, saved_moves, "white") === []) {
                return 2
            }
            else {
                return 0
            }
        }
    }

    printBoard(board, turn) {
        var wking = new Image()
        wking.src = "src/wking.png"
        var wqueen = new Image()
        wqueen.src = "src/wqueen.png"
        var wrook = new Image()
        wrook.src = "src/wrook.png"
        var wbishop = new Image()
        wbishop.src = "src/wbishop.png"
        var wknight = new Image()
        wknight.src = "src/wknight.png"
        var wpawn = new Image()
        wpawn.src = "src/wpawn.png"

        var king = new Image()
        king.src = "src/king.png"
        var queen = new Image()
        queen.src = "src/queen.png"
        var rook = new Image()
        rook.src = "src/rook.png"
        var bishop = new Image()
        bishop.src = "src/bishop.png"
        var knight = new Image()
        knight.src = "src/knight.png"
        var pawn = new Image()
        pawn.src = "src/pawn.png"

        window.onload = function() {
            for (let i=0; i<8; i++) {
                for (let j=0; j<8; j++) {
                    //white
                    if (board[i][j].status.type === "king" && board[i][j].status.color === "white") {
                        ctx.drawImage(wking, j*70+30, i*70+30, 70, 70);
                    }
                    else if (board[i][j].status.type === "queen" && board[i][j].status.color === "white") {
                        ctx.drawImage(wqueen, j*70+30, i*70+30, 70, 70);
                    }
                    else if (board[i][j].status.type === "rook" && board[i][j].status.color === "white") {
                        ctx.drawImage(wrook, j*70+30, i*70+30, 70, 70);
                    }
                    else if (board[i][j].status.type === "bishop" && board[i][j].status.color === "white") {
                        ctx.drawImage(wbishop, j*70+30, i*70+30, 70, 70);
                    }
                    else if (board[i][j].status.type === "knight" && board[i][j].status.color === "white") {
                        ctx.drawImage(wknight, j*70+30, i*70+30, 70, 70);
                    }
                    else if (board[i][j].status.type === "pawn" && board[i][j].status.color === "white") {
                        ctx.drawImage(wpawn, j*70+30, i*70+30, 70, 70);
                    }
                    //black
                    else if (board[i][j].status.type === "king" && board[i][j].status.color === "black") {
                        ctx.drawImage(king, j*70+30, i*70+30, 70, 70);
                    }
                    else if (board[i][j].status.type === "queen" && board[i][j].status.color === "black") {
                        ctx.drawImage(queen, j*70+30, i*70+30, 70, 70);
                    }
                    else if (board[i][j].status.type === "rook" && board[i][j].status.color === "black") {
                        ctx.drawImage(rook, j*70+30, i*70+30, 70, 70);
                    }
                    else if (board[i][j].status.type === "bishop" && board[i][j].status.color === "black") {
                        ctx.drawImage(bishop, j*70+30, i*70+30, 70, 70);
                    }
                    else if (board[i][j].status.type === "knight" && board[i][j].status.color === "black") {
                        ctx.drawImage(knight, j*70+30, i*70+30, 70, 70);
                    }
                    else if (board[i][j].status.type === "pawn" && board[i][j].status.color === "black") {
                        ctx.drawImage(pawn, j*70+30, i*70+30, 70, 70);
                    }
          
                } 
            }
        }
        //mention the turn  
        document.getElementById("player").innerHTML = turn
    }
}


//TEST
myGame = new game()
myGame.board[6][0].status.type="none"
myGame.board[6][0].status.color="none"
myGame.board[6][1].status.type="none"
myGame.board[6][1].status.color="none"
myGame.board[6][2].status.type="none"
myGame.board[6][2].status.color="none"
myGame.board[6][3].status.type="none"
myGame.board[6][3].status.color="none"
myGame.board[6][4].status.type="none"
myGame.board[6][4].status.color="none"
myGame.board[6][5].status.type="none"
myGame.board[6][5].status.color="none"
myGame.board[6][6].status.type="none"
myGame.board[6][6].status.color="none"
myGame.board[6][7].status.type="none"
myGame.board[6][7].status.color="none"

myGame.board[7][5].status.type="none"
myGame.board[7][5].status.color="none"
myGame.board[7][6].status.type="none"
myGame.board[7][6].status.color="none"

myGame.printBoard(myGame.board, myGame.turn)

function getInputValue() {
    var testMove = document.getElementById("myInput").value
    var i = 8 - parseInt(testMove[1])
    var j = -1
    if (testMove[0] === 'A') {
        j = 0
    }
    else if (testMove[0] == 'B') {
        j = 1
    }
    else if (testMove[0] == 'C') {
        j = 2
    }
    else if (testMove[0] == 'D') {
        j = 3
    }
    else if (testMove[0] == 'E') {
        j = 4
    }
    else if (testMove[0] == 'F') {
        j = 5
    }
    else if (testMove[0] == 'G') {
        j = 6
    }
    else if (testMove[0] == 'H') {
        j = 7
    }
    var k = 8 - parseInt(testMove[3])
    var l = -1
    if (testMove[2] === 'A') {
        l = 0
    }
    else if (testMove[2] == 'B') {
        l = 1
    }
    else if (testMove[2] == 'C') {
        l = 2
    }
    else if (testMove[2] == 'D') {
        l = 3
    }
    else if (testMove[2] == 'E') {
        l = 4
    }
    else if (testMove[2] == 'F') {
        l = 5
    }
    else if (testMove[2] == 'G') {
        l = 6
    }
    else if (testMove[2] == 'H') {
        l = 7
    }

    if (myGame.isPossible(myGame.board, [i,j,k,l], myGame.saved_moves, myGame.turn)) {
        alert("Good Move !")
    }
    else {
        alert("Bad Move :(")
    }
}

//console.log(myGame.possibleMoves(myGame.board, myGame.saved_moves, myGame.turn))
console.log(myGame.isPossible(myGame.board, [7,7,7,5], myGame.saved_moves, myGame.turn))

//test doMove by trying to go from a checked position to an unchecked one
//game can also end if......cyril
//(when quiting add do you want to save the game)
//UNDO (rounded arrow)
//OPTION (clock settings) : save game, new game, win, resign, draw
//EATEN pieces : reduce them to one list and remove alive_pieces and create saved_eaten_pieces
