const gameBoard = document.querySelector("#chessBoard");
const player = document.querySelector("#player");
const info= document.querySelector("#infoDisplays");

const width = 8;
let playerGo = 'black'
player.textContent='black'

const startingBoard=[rook, knight, bishop, queen, king, bishop, knight, rook,
                      pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
                      '', '', '', '', '', '', '', '',
                      '', '', '', '', '', '', '', '',
                      '','','','','','','','', 
                      '','','','','','','','', 
                      pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
                    rook, knight, bishop, queen, king, bishop, knight, rook];

function creatChessBoard(){
  startingBoard.forEach((strBoard,i)=>{
    const square=document.createElement("div") ;
    square.classList.add('square');

    const row= Math.floor(((63-i)/8))
    square.setAttribute('square_id',i);
    square.innerHTML= strBoard;
    square.firstChild?.setAttribute('draggable',true)
    if(row%2===0){
      square.classList.add(i%2 === 0 ? "black":"white");
      
    }else{
      square.classList.add(i%2 === 0 ? "white":"black");

    }
    if(i <= 15){
      square.firstChild?.firstChild?.classList.add("blackPiece");
      
    }
    if(i >= 48){
      square.firstChild?.firstChild?.classList.add("whitePiece");
      
    }
    
    gameBoard.append(square);
   

  }
  
)
}

creatChessBoard();


const allSquares = document.querySelectorAll("#chessBoard .square")
allSquares.forEach( square => {
  square.addEventListener('dragstart',dragStart)
  square.addEventListener('dragover',dragOver)
  square.addEventListener('drop',dragDrop)
})


let initialPosition
let draggedPiece
function dragStart(e){
  initialPosition = e.target.parentNode.getAttribute('square_id')
  draggedPiece = e.target
}

function dragOver(e){
  e.preventDefault()
}

function dragDrop(e){
  e.stopPropagation()
  const correctPiece=draggedPiece.firstChild.classList.contains(playerGo+"Piece")
  
  const taken = e.target.classList.contains('piece')
 const opponentGo = playerGo === 'white' ? 'black' : 'white'
 const takenByOpp = e.target.firstChild?.classList.contains(opponentGo)
//  if(correctPiece){
//   // if(takenByOpp && valid){
//   //   e.target.parentNode.append(draggedPiece)
//   //   e.target.remove()
//   //changePlayer()
//   // }
  if(taken && !takenByOpp){
    info.textContent="you can't play this move"
    setTimeout(()=>info.textContent="",3000)
    return
  }
 }



function changePlayer(){
  if(playerGo === 'black'){
    reverseIds()
    playerGo = 'white'
    player.textContent='white'
  }else{
    revertIds()
    playerGo='black'
    player.textContent='black'
  }
  console.log("ddsds")
}


function reverseIds(){
  const allSquares= document.querySelectorAll('.square')
  allSquares.forEach((square,i) => square.setAttribute("square_id",63 - i))
}

function revertIds(){
  const allSquares= document.querySelectorAll('.square')
  allSquares.forEach((square,i) => square.setAttribute("square_id",i))

}

