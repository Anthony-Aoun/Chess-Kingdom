var myGame = new game()
var shapes=[]
var sound = document.getElementById("moveSound")
var win = document.getElementById("winSound")
var draw = document.getElementById("drawSound")
document.getElementById("player").src = "src/white_dot.png"

var functions = {}

//define pieces
var empty = new Image()

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

//create squares objects
var none={

}
var A8={
    posi:[0,0],
    points:[{x:30,y:30},{x:100,y:30},{x:100,y:100},{x:30,y:100},{x:30,y:30}],
    color:"white",
    piece:rook
}
var B8={
    posi:[0,1],
    points:[{x:100,y:30},{x:170,y:30},{x:170,y:100},{x:100,y:100},{x:100,y:30}],
    color:"black", 
    piece:knight   
}
var C8={
    posi:[0,2],
    points:[{x:170,y:30},{x:240,y:30},{x:240,y:100},{x:170,y:100},{x:170,y:30}],
    color:"white", 
    piece:bishop  
}
var D8={
    posi:[0,3],
    points:[{x:240,y:30},{x:310,y:30},{x:310,y:100},{x:240,y:100},{x:240,y:30}],
    color:"black", 
    piece:queen  
}
var E8={
    posi:[0,4],
    points:[{x:310,y:30},{x:380,y:30},{x:380,y:100},{x:310,y:100},{x:310,y:30}],
    color:"white", 
    piece:king  
}
var F8={
    posi:[0,5],
    points:[{x:380,y:30},{x:450,y:30},{x:450,y:100},{x:380,y:100},{x:380,y:30}],
    color:"black", 
    piece:bishop  
}
var G8={
    posi:[0,6],
    points:[{x:450,y:30},{x:520,y:30},{x:520,y:100},{x:450,y:100},{x:450,y:30}],
    color:"white", 
    piece:knight  
}
var H8={
    posi:[0,7],
    points:[{x:520,y:30},{x:590,y:30},{x:590,y:100},{x:520,y:100},{x:520,y:30}],
    color:"black", 
    piece:rook  
}
var A7={
    posi:[1,0],
    points:[{x:30,y:100},{x:100,y:100},{x:100,y:170},{x:30,y:170},{x:30,y:100}],
    color:"black",
    piece:pawn
}
var B7={
    posi:[1,1],
    points:[{x:100,y:100},{x:170,y:100},{x:170,y:170},{x:100,y:170},{x:100,y:100}],
    color:"white", 
    piece:pawn   
}
var C7={
    posi:[1,2],
    points:[{x:170,y:100},{x:240,y:100},{x:240,y:170},{x:170,y:170},{x:170,y:100}],
    color:"black", 
    piece:pawn  
}
var D7={
    posi:[1,3],
    points:[{x:240,y:100},{x:310,y:100},{x:310,y:170},{x:240,y:170},{x:240,y:100}],
    color:"white", 
    piece:pawn  
}
var E7={
    posi:[1,4],
    points:[{x:310,y:100},{x:380,y:100},{x:380,y:170},{x:310,y:170},{x:310,y:100}],
    color:"black", 
    piece:pawn  
}
var F7={
    posi:[1,5],
    points:[{x:380,y:100},{x:450,y:100},{x:450,y:170},{x:380,y:170},{x:380,y:100}],
    color:"white", 
    piece:pawn  
}
var G7={
    posi:[1,6],
    points:[{x:450,y:100},{x:520,y:100},{x:520,y:170},{x:450,y:170},{x:450,y:100}],
    color:"black", 
    piece:pawn  
}
var H7={
    posi:[1,7],
    points:[{x:520,y:100},{x:590,y:100},{x:590,y:170},{x:520,y:170},{x:520,y:100}],
    color:"white", 
    piece:pawn  
}
var A6={
    posi:[2,0],
    points:[{x:30,y:170},{x:100,y:170},{x:100,y:240},{x:30,y:240},{x:30,y:170}],
    color:"white",
    piece:empty
}
var B6={
    posi:[2,1],
    points:[{x:100,y:170},{x:170,y:170},{x:170,y:240},{x:100,y:240},{x:100,y:170}],
    color:"black", 
    piece:empty   
}
var C6={
    posi:[2,2],
    points:[{x:170,y:170},{x:240,y:170},{x:240,y:240},{x:170,y:240},{x:170,y:170}],
    color:"white", 
    piece:empty  
}
var D6={
    posi:[2,3],
    points:[{x:240,y:170},{x:310,y:170},{x:310,y:240},{x:240,y:240},{x:240,y:170}],
    color:"black", 
    piece:empty  
}
var E6={
    posi:[2,4],
    points:[{x:310,y:170},{x:380,y:170},{x:380,y:240},{x:310,y:240},{x:310,y:170}],
    color:"white", 
    piece:empty  
}
var F6={
    posi:[2,5],
    points:[{x:380,y:170},{x:450,y:170},{x:450,y:240},{x:380,y:240},{x:380,y:170}],
    color:"black", 
    piece:empty  
}
var G6={
    posi:[2,6],
    points:[{x:450,y:170},{x:520,y:170},{x:520,y:240},{x:450,y:240},{x:450,y:170}],
    color:"white", 
    piece:empty  
}
var H6={
    posi:[2,7],
    points:[{x:520,y:170},{x:590,y:170},{x:590,y:240},{x:520,y:240},{x:520,y:170}],
    color:"black", 
    piece:empty  
}
var A5={
    posi:[3,0],
    points:[{x:30,y:240},{x:100,y:240},{x:100,y:310},{x:30,y:310},{x:30,y:240}],
    color:"black",
    piece:empty
}
var B5={
    posi:[3,1],
    points:[{x:100,y:240},{x:170,y:240},{x:170,y:310},{x:100,y:310},{x:100,y:240}],
    color:"white", 
    piece:empty   
}
var C5={
    posi:[3,2],
    points:[{x:170,y:240},{x:240,y:240},{x:240,y:310},{x:170,y:310},{x:170,y:240}],
    color:"black", 
    piece:empty  
}
var D5={
    posi:[3,3],
    points:[{x:240,y:240},{x:310,y:240},{x:310,y:310},{x:240,y:310},{x:240,y:240}],
    color:"white", 
    piece:empty  
}
var E5={
    posi:[3,4],
    points:[{x:310,y:240},{x:380,y:240},{x:380,y:310},{x:310,y:310},{x:310,y:240}],
    color:"black", 
    piece:empty  
}
var F5={
    posi:[3,5],
    points:[{x:380,y:240},{x:450,y:240},{x:450,y:310},{x:380,y:310},{x:380,y:240}],
    color:"white", 
    piece:empty  
}
var G5={
    posi:[3,6],
    points:[{x:450,y:240},{x:520,y:240},{x:520,y:310},{x:450,y:310},{x:450,y:240}],
    color:"black", 
    piece:empty  
}
var H5={
    posi:[3,7],
    points:[{x:520,y:240},{x:590,y:240},{x:590,y:310},{x:520,y:310},{x:520,y:240}],
    color:"white", 
    piece:empty  
}
var A4={
    posi:[4,0],
    points:[{x:30,y:310},{x:100,y:310},{x:100,y:380},{x:30,y:380},{x:30,y:310}],
    color:"white",
    piece:empty
}
var B4={
    posi:[4,1],
    points:[{x:100,y:310},{x:170,y:310},{x:170,y:380},{x:100,y:380},{x:100,y:310}],
    color:"black", 
    piece:empty   
}
var C4={
    posi:[4,2],
    points:[{x:170,y:310},{x:240,y:310},{x:240,y:380},{x:170,y:380},{x:170,y:310}],
    color:"white", 
    piece:empty  
}
var D4={
    posi:[4,3],
    points:[{x:240,y:310},{x:310,y:310},{x:310,y:380},{x:240,y:380},{x:240,y:310}],
    color:"black", 
    piece:empty  
}
var E4={
    posi:[4,4],
    points:[{x:310,y:310},{x:380,y:310},{x:380,y:380},{x:310,y:380},{x:310,y:310}],
    color:"white", 
    piece:empty  
}
var F4={
    posi:[4,5],
    points:[{x:380,y:310},{x:450,y:310},{x:450,y:380},{x:380,y:380},{x:380,y:310}],
    color:"black", 
    piece:empty  
}
var G4={
    posi:[4,6],
    points:[{x:450,y:310},{x:520,y:310},{x:520,y:380},{x:450,y:380},{x:450,y:310}],
    color:"white", 
    piece:empty  
}
var H4={
    posi:[4,7],
    points:[{x:520,y:310},{x:590,y:310},{x:590,y:380},{x:520,y:380},{x:520,y:310}],
    color:"black", 
    piece:empty  
}
var A3={
    posi:[5,0],
    points:[{x:30,y:380},{x:100,y:380},{x:100,y:450},{x:30,y:450},{x:30,y:380}],
    color:"black",
    piece:empty
}
var B3={
    posi:[5,1],
    points:[{x:100,y:380},{x:170,y:380},{x:170,y:450},{x:100,y:450},{x:100,y:380}],
    color:"white", 
    piece:empty   
}
var C3={
    posi:[5,2],
    points:[{x:170,y:380},{x:240,y:380},{x:240,y:450},{x:170,y:450},{x:170,y:380}],
    color:"black", 
    piece:empty  
}
var D3={
    posi:[5,3],
    points:[{x:240,y:380},{x:310,y:380},{x:310,y:450},{x:240,y:450},{x:240,y:380}],
    color:"white", 
    piece:empty  
}
var E3={
    posi:[5,4],
    points:[{x:310,y:380},{x:380,y:380},{x:380,y:450},{x:310,y:450},{x:310,y:380}],
    color:"black", 
    piece:empty  
}
var F3={
    posi:[5,5],
    points:[{x:380,y:380},{x:450,y:380},{x:450,y:450},{x:380,y:450},{x:380,y:380}],
    color:"white", 
    piece:empty  
}
var G3={
    posi:[5,6],
    points:[{x:450,y:380},{x:520,y:380},{x:520,y:450},{x:450,y:450},{x:450,y:380}],
    color:"black", 
    piece:empty  
}
var H3={
    posi:[5,7],
    points:[{x:520,y:380},{x:590,y:380},{x:590,y:450},{x:520,y:450},{x:520,y:380}],
    color:"white", 
    piece:empty  
}
var A2={
    posi:[6,0],
    points:[{x:30,y:450},{x:100,y:450},{x:100,y:520},{x:30,y:520},{x:30,y:450}],
    color:"white",
    piece:wpawn
}
var B2={
    posi:[6,1],
    points:[{x:100,y:450},{x:170,y:450},{x:170,y:520},{x:100,y:520},{x:100,y:450}],
    color:"black", 
    piece:wpawn   
}
var C2={
    posi:[6,2],
    points:[{x:170,y:450},{x:240,y:450},{x:240,y:520},{x:170,y:520},{x:170,y:450}],
    color:"white", 
    piece:wpawn  
}
var D2={
    posi:[6,3],
    points:[{x:240,y:450},{x:310,y:450},{x:310,y:520},{x:240,y:520},{x:240,y:450}],
    color:"black", 
    piece:wpawn  
}
var E2={
    posi:[6,4],
    points:[{x:310,y:450},{x:380,y:450},{x:380,y:520},{x:310,y:520},{x:310,y:450}],
    color:"white", 
    piece:wpawn  
}
var F2={
    posi:[6,5],
    points:[{x:380,y:450},{x:450,y:450},{x:450,y:520},{x:380,y:520},{x:380,y:450}],
    color:"black", 
    piece:wpawn  
}
var G2={
    posi:[6,6],
    points:[{x:450,y:450},{x:520,y:450},{x:520,y:520},{x:450,y:520},{x:450,y:450}],
    color:"white", 
    piece:wpawn  
}
var H2={
    posi:[6,7],
    points:[{x:520,y:450},{x:590,y:450},{x:590,y:520},{x:520,y:520},{x:520,y:450}],
    color:"black", 
    piece:wpawn  
}
var A1={
    posi:[7,0],
    points:[{x:30,y:520},{x:100,y:520},{x:100,y:590},{x:30,y:590},{x:30,y:520}],
    color:"black",
    piece:wrook
}
var B1={
    posi:[7,1],
    points:[{x:100,y:520},{x:170,y:520},{x:170,y:590},{x:100,y:590},{x:100,y:520}],
    color:"white", 
    piece:wknight   
}
var C1={
    posi:[7,2],
    points:[{x:170,y:520},{x:240,y:520},{x:240,y:590},{x:170,y:590},{x:170,y:520}],
    color:"black", 
    piece:wbishop  
}
var D1={
    posi:[7,3],
    points:[{x:240,y:520},{x:310,y:520},{x:310,y:590},{x:240,y:590},{x:240,y:520}],
    color:"white", 
    piece:wqueen  
}
var E1={
    posi:[7,4],
    points:[{x:310,y:520},{x:380,y:520},{x:380,y:590},{x:310,y:590},{x:310,y:520}],
    color:"black", 
    piece:wking  
}
var F1={
    posi:[7,5],
    points:[{x:380,y:520},{x:450,y:520},{x:450,y:590},{x:380,y:590},{x:380,y:520}],
    color:"white", 
    piece:wbishop  
}
var G1={
    posi:[7,6],
    points:[{x:450,y:520},{x:520,y:520},{x:520,y:590},{x:450,y:590},{x:450,y:520}],
    color:"black", 
    piece:wknight  
}
var H1={
    posi:[7,7],
    points:[{x:520,y:520},{x:590,y:520},{x:590,y:590},{x:520,y:590},{x:520,y:520}],
    color:"white", 
    piece:wrook  
}

//save squares in a shapes[] array
shapes.push(A8);
shapes.push(B8);
shapes.push(C8);
shapes.push(D8);
shapes.push(E8);
shapes.push(F8);
shapes.push(G8);
shapes.push(H8);
shapes.push(A7);
shapes.push(B7);
shapes.push(C7);
shapes.push(D7);
shapes.push(E7);
shapes.push(F7);
shapes.push(G7);
shapes.push(H7);
shapes.push(A6);
shapes.push(B6);
shapes.push(C6);
shapes.push(D6);
shapes.push(E6);
shapes.push(F6);
shapes.push(G6);
shapes.push(H6);
shapes.push(A5);
shapes.push(B5);
shapes.push(C5);
shapes.push(D5);
shapes.push(E5);
shapes.push(F5);
shapes.push(G5);
shapes.push(H5);
shapes.push(A4);
shapes.push(B4);
shapes.push(C4);
shapes.push(D4);
shapes.push(E4);
shapes.push(F4);
shapes.push(G4);
shapes.push(H4);
shapes.push(A3);
shapes.push(B3);
shapes.push(C3);
shapes.push(D3);
shapes.push(E3);
shapes.push(F3);
shapes.push(G3);
shapes.push(H3);
shapes.push(A2);
shapes.push(B2);
shapes.push(C2);
shapes.push(D2);
shapes.push(E2);
shapes.push(F2);
shapes.push(G2);
shapes.push(H2);
shapes.push(A1);
shapes.push(B1);
shapes.push(C1);
shapes.push(D1);
shapes.push(E1);
shapes.push(F1);
shapes.push(G1);
shapes.push(H1);

//function called when window loads
window.onload = function() {
    //canvas variables
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    var $canvas=$("#canvas");
    var canvasOffset=$canvas.offset();
    var offsetX=canvasOffset.left;
    var offsetY=canvasOffset.top;
    var scrollX=$canvas.scrollLeft();
    var scrollY=$canvas.scrollTop();

    //transparent canvas
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.fillRect(0,0,620,620);

    //black annotation
    ctx.globalAlpha = 1;
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "rgb(0,0,0)"
    ctx.lineWidth = 1
    //left
    ctx.fillText("8",6,75)
    ctx.fillText("7",6,145)
    ctx.fillText("6",6,215)
    ctx.fillText("5",6,285)
    ctx.fillText("4",6,355)
    ctx.fillText("3",6,425)
    ctx.fillText("2",6,495)
    ctx.fillText("1",6,565)
    //right
    ctx.fillText("8",597,75)
    ctx.fillText("7",597,145)
    ctx.fillText("6",597,215)
    ctx.fillText("5",597,285)
    ctx.fillText("4",597,355)
    ctx.fillText("3",597,425)
    ctx.fillText("2",597,495)
    ctx.fillText("1",597,565)
    //down
    ctx.fillText("A",50,615)
    ctx.fillText("B",120,615)
    ctx.fillText("C",190,615)
    ctx.fillText("D",260,615)
    ctx.fillText("E",330,615)
    ctx.fillText("F",400,615)
    ctx.fillText("G",470,615)
    ctx.fillText("H",540,615)
    //up
    ctx.fillText("A",50,25)
    ctx.fillText("B",120,25)
    ctx.fillText("C",190,25)
    ctx.fillText("D",260,25)
    ctx.fillText("E",330,25)
    ctx.fillText("F",400,25)
    ctx.fillText("G",470,25)
    ctx.fillText("H",540,25)

    functions = {

    //function to draw (but not fill/stroke) a shape
    //(needed because isPointInPath only tests the last defined path)
    define : function define(shape){
        ctx.globalAlpha = 1
        var points=shape.points;
        ctx.beginPath();
        ctx.moveTo(points[0].x,points[0].y);
        for(var i=1;i<points.length;i++){
            ctx.lineTo(points[i].x,points[i].y);
        }
    },

    //function to display a shape on the canvas (define + fill + stroke + image inside)
    draw : function draw(shape, stroke, fill){
        //clear shape
        ctx.clearRect(shape.points[0].x, shape.points[0].y, 70, 70);
        //square transparency
        functions.define(shape);
        if (shape.color === "white") {
            ctx.globalAlpha = 1
        }
        else {
            ctx.globalAlpha = 0.5
        }
        ctx.fillStyle = fill
        ctx.fill();
        ctx.globalAlpha = 1
        ctx.strokeStyle = stroke
        ctx.stroke();
        //draw piece
        if (shape.piece !== empty) {
            ctx.globalAlpha = 1
            ctx.drawImage(shape.piece, shape.points[0].x, shape.points[0].y, 70, 70);
        }   
    },

    //function to print board each time
    printBoard : function printBoard() {
        for(var i=0;i<shapes.length;i++){
            var k = shapes[i].posi[0]
            var l = shapes[i].posi[1]
            if (myGame.board[k][l].status.type === "king" && myGame.board[k][l].status.color ==="white") {
                shapes[i].piece = wking
            }
            else if (myGame.board[k][l].status.type === "queen" && myGame.board[k][l].status.color ==="white") {
                shapes[i].piece = wqueen
            }
            else if (myGame.board[k][l].status.type === "rook" && myGame.board[k][l].status.color ==="white") {
                shapes[i].piece = wrook
            }
            else if (myGame.board[k][l].status.type === "bishop" && myGame.board[k][l].status.color ==="white") {
                shapes[i].piece = wbishop
            }
            else if (myGame.board[k][l].status.type === "knight" && myGame.board[k][l].status.color ==="white") {
                shapes[i].piece = wknight
            }
            else if (myGame.board[k][l].status.type === "pawn" && myGame.board[k][l].status.color ==="white") {
                shapes[i].piece = wpawn
            }
            else if (myGame.board[k][l].status.type === "king" && myGame.board[k][l].status.color ==="black") {
                shapes[i].piece = king
            }
            else if (myGame.board[k][l].status.type === "queen" && myGame.board[k][l].status.color ==="black") {
                shapes[i].piece = queen
            }
            else if (myGame.board[k][l].status.type === "rook" && myGame.board[k][l].status.color ==="black") {
                shapes[i].piece = rook
            }
            else if (myGame.board[k][l].status.type === "bishop" && myGame.board[k][l].status.color ==="black") {
                shapes[i].piece = bishop
            }
            else if (myGame.board[k][l].status.type === "knight" && myGame.board[k][l].status.color ==="black") {
                shapes[i].piece = knight
            }
            else if (myGame.board[k][l].status.type === "pawn" && myGame.board[k][l].status.color ==="black") {
                shapes[i].piece = pawn
            }
            else {
                shapes[i].piece = empty
            }
        }
         //print turn
         if (myGame.turn === "white") {
            document.getElementById("player").src = "src/white_dot.png"
         }
         else {
            document.getElementById("player").src = "src/black_dot.png"
         }
         
                
         //print if checked
         if (myGame.isChecked(myGame.board, myGame.saved_moves, myGame.turn)[0]) {
             document.getElementById("check").innerHTML = "Check!"
         }
         else {
             document.getElementById("check").innerHTML = ""
         }

         //end-game?
         var result = myGame.endGame(myGame.board, myGame.saved_moves)
         if (result[0] !== "none") {
             //stop loop
             myGame.gameOver = true
             //output the end-game method
             document.getElementById("check").innerHTML = result[1]
         }

         //
         //print eaten pieces
         //
        //display board
        for(var i=0;i<shapes.length;i++){
            functions.draw(shapes[i], "white", "white")
        }
        //check if game ended
        if (myGame.gameOver) {
            if (myGame.turn === "black") {
                document.getElementById('wgameOver').style.display='block'
                win.play()
            }
            else{
                document.getElementById('gameOver').style.display='block'
                win.play()
            }
        }
    },

    //promote white pawn
    wpromote : function wpromote(type) {
        var move = myGame.saved_moves[myGame.saved_moves.length-1]
        //modify board
        myGame.board[move[2]][move[3]].status.type = type
        //modify last board in saved_board
        myGame.saved_boards[myGame.saved_boards.length - 1][move[2]][move[3]].status.type = type
        //close CSS modal
        document.getElementById('wpromotion').style.display='none'
        //print board
        functions.printBoard()
        
    },

    //promote black pawn
    promote : function wpromote(type) {
        var move = myGame.saved_moves[myGame.saved_moves.length-1]
        //modify board
        myGame.board[move[2]][move[3]].status.type = type
        //modify last board in saved_board
        myGame.saved_boards[myGame.saved_boards.length - 1][move[2]][move[3]].status.type = type
        //close CSS modal
        document.getElementById('promotion').style.display='none'
        //print board
        functions.printBoard()
        
    },

    //function to UNDO move
    undo : function undo() {   
        myGame.gameOver = false
        if (myGame.saved_boards.length === 1) {
            console.log("Can't UNDO anymore")
        }
        else {
            myGame.saved_boards.pop()
            myGame.board = myGame.cloneBoard(myGame.saved_boards[myGame.saved_boards.length - 1])
            myGame.saved_moves.pop()
            myGame.saved_eaten.pop()
            if (myGame.turn === "white") {
                myGame.turn = "black"
            }
            else {
                myGame.turn = "white"
            }
            //print board
            functions.printBoard()
        }
    },

    //function to start new game
    newGame : function newGame() {
        myGame.board = new Array(8)
        myGame.saved_boards = []
        myGame.saved_moves = []
        myGame.saved_eaten = []
        myGame.turn = "white"
        myGame.gameOver = false
        //transform board into a matrix of squares
        for (let i=0; i<8; i++) {
            myGame.board[i] = new Array(8)
            for (let j=0; j<8; j++) {
                myGame.board[i][j] = new square("black")
                if (i%2 === 0 && j%2 === 0) {
                    myGame.board[i][j].color = "white"
                }
            }
        }
        //fill the pieces in the squares of the board
        myGame.board[0][0].status = new piece("rook", "black")
        myGame.board[0][1].status = new piece("knight", "black")
        myGame.board[0][2].status = new piece("bishop", "black")
        myGame.board[0][3].status = new piece("queen", "black")
        myGame.board[0][4].status = new piece("king", "black")
        myGame.board[0][5].status = new piece("bishop", "black")
        myGame.board[0][6].status = new piece("knight", "black")
        myGame.board[0][7].status = new piece("rook", "black")

        for (let j=0; j<8; j++) {
            myGame.board[1][j].status = new piece("pawn", "black")
        }

        for (let j=0; j<8; j++) {
            myGame.board[6][j].status = new piece("pawn", "white")
        }
        myGame.board[7][0].status = new piece("rook", "white")
        myGame.board[7][1].status = new piece("knight", "white")
        myGame.board[7][2].status = new piece("bishop", "white")
        myGame.board[7][3].status = new piece("queen", "white")
        myGame.board[7][4].status = new piece("king", "white")
        myGame.board[7][5].status = new piece("bishop", "white")
        myGame.board[7][6].status = new piece("knight", "white")
        myGame.board[7][7].status = new piece("rook", "white")
        //start filling the saved_boards list with a clone of the first configuration and also the saved_eaten
        var boardClone = myGame.cloneBoard(myGame.board)
        myGame.saved_boards.push(boardClone)
        var added_piece = new piece("none", "none")
        myGame.saved_eaten.push(added_piece)
        //print board
        functions.printBoard()
    },

    //output end-game after resign
    resign : function resign() {
        if (myGame.turn === "black") {
            document.getElementById('wgameOver').style.display='block'
            win.play()
        }
        else{
            document.getElementById('gameOver').style.display='block'
            win.play()
        } 
        myGame.gameOver = true
    },

    //output end-game after draw
    drawGame : function drawGame() {
        document.getElementById('draw').style.display='block'
        draw.play()
        myGame.gameOver = true
    },
}
    
    //stytle
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.strokeStyle = "rgb(255,255,255)"

    //display initial board
    for(var i=0;i<shapes.length;i++){
        functions.draw(shapes[i], "white", "white")
    }


    $(function(){
        //called when user clicks the mouse
        var clicked = false
        var clicked_square = none 

        function handleMouseDown(e){
        e.preventDefault();

        // get the mouse position
        var mouseX=parseInt(e.clientX-offsetX);
        var mouseY=parseInt(e.clientY-offsetY);

        //iterate each shape in the shapes array
        for(var i=0;i<shapes.length;i++){
            var shape=shapes[i];
            // define the current shape
            functions.define(shape);
            // test if the mouse is in the current shape
            if(ctx.isPointInPath(mouseX,mouseY)){
                /////////////////////////
                //THE MOVE HAPPENS HERE//
                /////////////////////////

                //if game is over, no move is possible
                if (myGame.gameOver) {
                    console.log("Can't move, game is over")
                }
                //First click
                else if (clicked === false && !myGame.gameOver) {  
                    if (myGame.board[shape.posi[0]][shape.posi[1]].status.color === myGame.turn) {
                        //mark clicked square with black stroke
                        functions.draw(shape, "black", "white")
                        //mark the possibilities in green
                        for (var i=0;i<shapes.length;i++) {
                            var possible = shapes[i]
                            if (myGame.isPossible(myGame.board, [shape.posi[0],shape.posi[1],possible.posi[0],possible.posi[1]], myGame.saved_moves, myGame.turn)) {
                                if (myGame.board[possible.posi[0]][possible.posi[1]].status.type !== "none") {
                                    functions.draw(possible, "white", "rgb(255,210,210)")
                                }
                                else {
                                    functions.draw(possible, "white", "rgb(210,255,215)")
                                }    
                            }
                        }
                    
                        clicked_square = shape
                        clicked = true
                    }
                }
                //Second click
                else {
                    //check if same color
                    if (myGame.board[shape.posi[0]][shape.posi[1]].status.color === myGame.turn && (shape.posi[0] !== clicked_square.posi[0] || shape.posi[1] !== clicked_square.posi[1])) {
                        //reprint board to clear selected squares
                        for (var i=0;i<shapes.length;i++) {
                            functions.draw(shapes[i], "white", "white")
                        }

                        //mark clicked square with black stroke
                        functions.draw(shape, "black", "white")
                        //mark the possibilities in green
                        for (var i=0;i<shapes.length;i++) {
                            var possible = shapes[i]
                            if (myGame.isPossible(myGame.board, [shape.posi[0],shape.posi[1],possible.posi[0],possible.posi[1]], myGame.saved_moves, myGame.turn)) {
                                if (myGame.board[possible.posi[0]][possible.posi[1]].status.type !== "none") {
                                    functions.draw(possible, "white", "rgb(255,210,210)")
                                }
                                else {
                                    functions.draw(possible, "white", "rgb(210,255,215)")
                                }    
                            }
                        }
                        
                        clicked_square = shape
                        clicked = true
                    
                    }
                    else {
                        //check if the move is possible
                        if (myGame.isPossible(myGame.board, [clicked_square.posi[0],clicked_square.posi[1],shape.posi[0],shape.posi[1]], myGame.saved_moves, myGame.turn)) {      
                            //make move, modify matrix and game variables
                            myGame.playerMove([clicked_square.posi[0],clicked_square.posi[1],shape.posi[0],shape.posi[1]])
                            //change the pieces in the shapes according to matrix pieces
                            for(var i=0;i<shapes.length;i++){
                                var k = shapes[i].posi[0]
                                var l = shapes[i].posi[1]
                                if (myGame.board[k][l].status.type === "king" && myGame.board[k][l].status.color ==="white") {
                                    shapes[i].piece = wking
                                }
                                else if (myGame.board[k][l].status.type === "queen" && myGame.board[k][l].status.color ==="white") {
                                    shapes[i].piece = wqueen
                                }
                                else if (myGame.board[k][l].status.type === "rook" && myGame.board[k][l].status.color ==="white") {
                                    shapes[i].piece = wrook
                                }
                                else if (myGame.board[k][l].status.type === "bishop" && myGame.board[k][l].status.color ==="white") {
                                    shapes[i].piece = wbishop
                                }
                                else if (myGame.board[k][l].status.type === "knight" && myGame.board[k][l].status.color ==="white") {
                                    shapes[i].piece = wknight
                                }
                                else if (myGame.board[k][l].status.type === "pawn" && myGame.board[k][l].status.color ==="white") {
                                    shapes[i].piece = wpawn
                                }
                                else if (myGame.board[k][l].status.type === "king" && myGame.board[k][l].status.color ==="black") {
                                    shapes[i].piece = king
                                }
                                else if (myGame.board[k][l].status.type === "queen" && myGame.board[k][l].status.color ==="black") {
                                    shapes[i].piece = queen
                                }
                                else if (myGame.board[k][l].status.type === "rook" && myGame.board[k][l].status.color ==="black") {
                                    shapes[i].piece = rook
                                }
                                else if (myGame.board[k][l].status.type === "bishop" && myGame.board[k][l].status.color ==="black") {
                                    shapes[i].piece = bishop
                                }
                                else if (myGame.board[k][l].status.type === "knight" && myGame.board[k][l].status.color ==="black") {
                                    shapes[i].piece = knight
                                }
                                else if (myGame.board[k][l].status.type === "pawn" && myGame.board[k][l].status.color ==="black") {
                                    shapes[i].piece = pawn
                                }
                                else {
                                    shapes[i].piece = empty
                                }
                            }
                            
                            //print new turn
                            if (myGame.turn === "white") {
                                document.getElementById("player").src = "src/white_dot.png"
                             }
                             else {
                                document.getElementById("player").src = "src/black_dot.png"
                             }
                            
                            //print if checked
                            if (myGame.isChecked(myGame.board, myGame.saved_moves, myGame.turn)[0]) {
                                document.getElementById("check").innerHTML = "Check!"
                            }
                            else {
                                document.getElementById("check").innerHTML = ""
                            }

                            //end-game?
                            var result = myGame.endGame(myGame.board, myGame.saved_moves)
                            if (result[0] !== "none") {
                                //stop loop
                                myGame.gameOver = true
                                //output the end-game method
                                document.getElementById("check").innerHTML = result[1]
                            }
                            //
                            //print eaten pieces
                            //
                            //play sound
                            sound.play()
                        }
                        //print new board
                        for(var i=0;i<shapes.length;i++){
                            functions.draw(shapes[i], "white", "white")
                        }
                        //check if game ended
                        if (myGame.gameOver) {
                            if (myGame.turn === "black") {
                                document.getElementById('wgameOver').style.display='block'
                                win.play()
                            }
                            else{
                                document.getElementById('gameOver').style.display='block'
                                win.play()
                            }
                        }
                        //back to First click
                        clicked_square = none
                        clicked = false
                    }
                    
                }
            }
        }

        }

        // listen for mousedown events
        $("#canvas").mousedown(function(e){handleMouseDown(e);});
    }); // end $(function(){}); 
}


