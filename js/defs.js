//define the class pieces
class piece {
    constructor(type, color) {
    //initial status of all pieces
        this.type = type
        this.color = color
        //all pieces default
        this.moved = false //king-rook-pawn
    }
}

//define the class square
class square {
    constructor(color) {
        this.color = color
        //square default
        this.status = new piece("none", "none")
    }
}

class game {
    constructor() {
    //game default
    this.board = new Array(8)
    this.saved_boards = []
    this.saved_moves = []
    this.eaten_white = []
    this.eaten_black = []
    this.turn = "white"
    this.check = false
    
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
    this.board[0][0].status = new piece("rook", "black")
    this.board[0][1].status = new piece("knight", "black")
    this.board[0][2].status = new piece("bishop", "black")
    this.board[0][3].status = new piece("queen", "black")
    this.board[0][4].status = new piece("king", "black")
    this.board[0][5].status = new piece("bishop", "black")
    this.board[0][6].status = new piece("knight", "black")
    this.board[0][7].status = new piece("rook", "black")

    for (let j=0; j<8; j++) {
        this.board[1][j].status = new piece("pawn", "black")
    }

    for (let j=0; j<8; j++) {
        this.board[6][j].status = new piece("pawn", "white")
    }

    this.board[7][0].status = new piece("rook", "white")
    this.board[7][1].status = new piece("knight", "white")
    this.board[7][2].status = new piece("bishop", "white")
    this.board[7][3].status = new piece("queen", "white")
    this.board[7][4].status = new piece("king", "white")
    this.board[7][5].status = new piece("bishop", "white")
    this.board[7][6].status = new piece("knight", "white")
    this.board[7][7].status = new piece("rook", "white")

    //start filling the saved_boards list with a clone of the first configuration
    var boardClone = this.cloneBoard()
    this.saved_boards.push(boardClone)
    }

    //clones this.board to add it to this.saved_boards
    cloneBoard() {
        var board = Array(8)
        //transform board into a matrix of squares
        for (let i=0; i<8; i++) {
            board[i] = new Array(8)
            for (let j=0; j<8; j++) {
                board[i][j] = new square("black")
                if (i%2 === 0 && j%2 === 0) {
                    board[i][j].color = "white"
                }
            }
        }
        //fill the pieces
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                board[i][j].status = new piece(this.board[i][j].status.type, this.board[i][j].status.color)
                board[i][j].status.moved = this.board[i][j].status.moved
            }
        }
        return board
    }

    //check if a position is threatened (posi is a size 2 Array), return [bool, position of piece_threatening]
    isThreatened(posi) {
        //////////////
        ///  FILL  ///
        //////////////
    }

    //check if a piece at a position is freezed (posi is a size 2 Array)
    isFreezed(posi) {
        //////////////
        ///  FILL  ///
        //////////////
    }

    //check if a move is possible (move is a size 4 Array that contains starting and ending position)
    isPossible(move) {
        //check if in the board
        if (move[0]>=0 && move[0]<=7 && move[1]>=0 && move[1]<=7 && move[2]>=0 && move[2]<=7 && move[3]>=0 && move[3]<=7) {
            //check if start color is this.turn and end color is not this.turn
            if (this.board[move[0]][move[1]].status.color === this.turn && this.board[move[2]][move[3]].status.color !== this.turn) {
                //is the start freezed?
                if (this.isFreezed(this.board,[move[0], move[1]])) {
                    return false
                }
                //if checked we can only move the king
                if (this.check && this.board[move[0]][move[1]].status.type !== "king") {
                    return false
                }

                //what is the start type:

                //king
                if (this.board[move[0]][move[1]].status.type === "king") {
                    //we can only move the king in an unthreatened square

                    //good path

                    //////////////
                    ///  FILL  ///
                    //////////////
                }
                //queen
                else if (this.board[move[0]][move[1]].status.type === "queen") {
                    //vertical move
                    if (move[1] === move[3]) {
                        for(let i=min(move[0], move[2])+1; i<max(move[0], move[2]); i++) {
                            if (this.board[i][move[1]].status.type !== "none") {
                                return false
                            }
                        }
                        return true
                    }
                    //horizontal move
                    else if (move[0] === move[2]) {
                        for(let j=min(move[1], move[3])+1; j<max(move[1], move[3]); j++) {
                            if (this.board[move[0]][j].status.type !== "none") {
                                return false
                            }
                        }
                        return true
                    }
                    //North-East diagonal move
                    else if (move[0]+move[1] === move[2]+move[3]) {
                        for(let i=max(move[0], move[2])-1; i>min(move[0], move[2]); i--) {
                            for(let j=min(move[1], move[3])+1; j<max(move[1], move[3]); j++) {
                                if (this.board[i][j].status.type !== "none") {
                                    return false
                                }
                            }
                        }
                        return true
                    }
                    //North-West diagonal move
                    else if (move[0]-move[1] === move[2]-move[3]) {
                        for(let i=min(move[0], move[2])+1; i<max(move[0], move[2]); i++) {
                            for(let j=min(move[1], move[3])+1; j<max(move[1], move[3]); j++) {
                                if (this.board[i][j].status.type !== "none") {
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
                //rook
                else if (this.board[move[0]][move[1]].status.type === "rook") {
                    //vertical move
                    if (move[1] === move[3]) {
                        for(let i=min(move[0], move[2])+1; i<max(move[0], move[2]); i++) {
                            if (this.board[i][move[1]].status.type !== "none") {
                                return false
                            }
                        }
                        return true
                    }
                    //horizontal move
                    else if (move[0] === move[2]) {
                        for(let j=min(move[1], move[3])+1; j<max(move[1], move[3]); j++) {
                            if (this.board[move[0]][j].status.type !== "none") {
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
                else if (this.board[move[0]][move[1]].status.type === "bishop") {
                    //North-East diagonal move
                    if (move[0]+move[1] === move[2]+move[3]) {
                        for(let i=max(move[0], move[2])-1; i>min(move[0], move[2]); i--) {
                            for(let j=min(move[1], move[3])+1; j<max(move[1], move[3]); j++) {
                                if (this.board[i][j].status.type !== "none") {
                                    return false
                                }
                            }
                        }
                        return true
                    }
                    //North-West diagonal move
                    else if (move[0]-move[1] === move[2]-move[3]) {
                        for(let i=min(move[0], move[2])+1; i<max(move[0], move[2]); i++) {
                            for(let j=min(move[1], move[3])+1; j<max(move[1], move[3]); j++) {
                                if (this.board[i][j].status.type !== "none") {
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
                //knight
                else if (this.board[move[0]][move[1]].status.type === "knight") {
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
                else if (this.board[move[0]][move[1]].status.type === "pawn") {
                    //white pawn
                    if (this.turn === "white") {
                        //if didn't move yet can make 2 steps
                        if (move[1] === move[3] && move[0]-move[2] === 2 && !(this.board[move[0]][move[1]].status.moved) && this.board[move[0]-1][move[1]].status.type === "none" && this.board[move[0]-2][move[1]].status.type === "none") {
                            return true
                        }
                        //move 1 step forward
                        else if (move[1] === move[3] && move[0]-move[2] === 1 && this.board[move[2]][move[3]].status.type === "none") {
                            return true
                        }
                        //diagonal eating
                        else if (move[0]-move[2] === 1 && Math.abs(move[1]-move[3]) === 1 && this.board[move[2]][move[3]].status.color === "black") {
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
                        if (move[1] === move[3] && move[2]-move[0] === 2 && !(this.board[move[0]][move[1]].status.moved) && this.board[move[0]+1][move[1]].status.type === "none" && this.board[move[0]+2][move[1]].status.type === "none") {
                            return true
                        }
                        //move 1 step forward
                        else if (move[1] === move[3] && move[2]-move[0] === 1 && this.board[move[2]][move[3]].status.type === "none") {
                            return true
                        }
                        //diagonal eating
                        else if (move[2]-move[0] === 1 && Math.abs(move[1]-move[3]) === 1 && this.board[move[2]][move[3]].status.color === "white") {
                            return true
                        }
                        //invalid move
                        else {
                            return false
                        }
                    }
                }
            }
            //castling
            else if  (this.board[move[0]][move[1]].status.type === "king" && this.board[move[0]][move[1]].status.color === this.turn && this.board[move[2]][move[3]].status.type === "rook" && this.board[move[2]][move[3]].status.color === this.turn) {
                //////////////
                ///  FILL  ///
                //////////////
                
                // X if this.check
                // X if king moved
                // X if rook moved
                //between king and rook should be empty and not threatened
            }
            //en passant
            else if (this.board[move[0]][move[1]].status.type === "pawn" && this.board[move[0]][move[1]].status.color === this.turn && this.board[move[2]][move[3]].status.type === "none") {
                //white pawn, left en passant
                if (this.turn === "white" && move[0] === 3 && move[2] === 2 && move[3] === move[1]-1 && this.saved_moves[this.saved_moves.length-1] === [1, move[1]-1, 3, move[1]-1]) {
                    return true
                }
                //white pawn, right en passant
                else if (this.turn === "white" && move[0] === 3 && move[2] === 2 && move[3] === move[1]+1 && this.saved_moves[this.saved_moves.length-1] === [1, move[1]+1, 3, move[1]+1]) {
                    return true
                }
                //black pawn, left en passant
                else if (this.turn === "black" && move[0] === 4 && move[2] === 5 && move[3] === move[1]-1 && this.saved_moves[this.saved_moves.length-1] === [6, move[1]-1, 4, move[1]-1]) {
                    return true
                }
                //black pawn, right en passant
                else if (this.turn === "black" && move[0] === 4 && move[2] === 5 && move[3] === move[1]+1 && this.saved_moves[this.saved_moves.length-1] === [6, move[1]+1, 4, move[1]+1]) {
                    return true
                }
                //invalid move
                else {
                    return false
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

    //returns an Array of moves (size 4 Array)
    possibleMoves() {
        var possible = []
        for(let i=0; i<8; i++) {
            for(let j=0; j<8; j++) {
                for(let k=0; k<8; k++) {
                    for(let l=0; l<8; l++) {
                        if (this.isPossible([i, j, k, l])) {
                            possible.push([i, j, k, l])
                        }
                    }
                }
            }
        }
        return possible
    }

    doMove(move) {

        //////////////
        ///  FILL  ///
        //////////////

        //modify this.board (if king, rook or pawn moves modify piece.moved)
        //modify this.eaten_white
        //modify this.eaten_black
        //add it to saved_boards
        //add move to saved_moves
        //change this.turn
        //search for the king and verify if isThreatened to modify this.check

        //NB: if the move is castling be careful and if pawn on last line
    }

    //returns 0 if no one won, 1 if white won, 2 if black won
    checkmate() {
        if (!(this.check)) {
            return 0
        }
        else {
            if (this.possibleMoves("black") === []) {
                return 1
            }
            else if (this.possibleMoves("white") === []) {
                return 2
            }
            else {
                return 0
            }
        }
    }

    printBoard(board) {
        var str=""
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                //white
                if (board[i][j].status.type === "king" && board[i][j].status.color === "white") {
                    str += "K"
                }
                else if (board[i][j].status.type === "queen" && board[i][j].status.color === "white") {
                    str += "Q"
                }
                else if (board[i][j].status.type === "rook" && board[i][j].status.color === "white") {
                    str += "R"
                }
                else if (board[i][j].status.type === "bishop" && board[i][j].status.color === "white") {
                    str += "B"
                }
                else if (board[i][j].status.type === "knight" && board[i][j].status.color === "white") {
                    str += "N"
                }
                else if (board[i][j].status.type === "pawn" && board[i][j].status.color === "white") {
                    str += " P"
                }
                //black
                else if (board[i][j].status.type === "king" && board[i][j].status.color === "black") {
                    str += " k"
                }
                else if (board[i][j].status.type === "queen" && board[i][j].status.color === "black") {
                    str += " q"
                }
                else if (board[i][j].status.type === "rook" && board[i][j].status.color === "black") {
                    str += " r"
                }
                else if (board[i][j].status.type === "bishop" && board[i][j].status.color === "black") {
                    str += " b"
                }
                else if (board[i][j].status.type === "knight" && board[i][j].status.color === "black") {
                    str += " n"
                }
                else if (board[i][j].status.type === "pawn" && board[i][j].status.color === "black") {
                    str += " p"
                }
                //none
                else {
                    str += " *"
                }
                //back to line
                if (j === 7) {
                    document.getElementById(i).innerHTML = str
                    str = ""
                }
            }
        }
    }
}


//TEST
myGame = new game()
myGame.board[6][3].status.type="none"
myGame.board[6][3].status.color="none"
myGame.board[4][3].status.type="pawn"
myGame.board[4][3].status.color="white"
myGame.printBoard(myGame.board)
console.log(myGame.isPossible([6,0,3,0]))
var arr = [1,2,3]
console.log(arr.length)
