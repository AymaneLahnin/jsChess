const gameBoard = document.querySelector("#chessBoard");
const player = document.querySelector("#player");

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


let initialPosition=-1;
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
  const opponentGo = playerGo === 'white' ? 'black' : 'white'
  const taken = e.target.classList.contains('piece')
 const takenByOpp = e.target.firstChild?.classList.contains(opponentGo+"Piece");
 
 const info= document.querySelector("#infoDisplays");
const valid = checkIfValid(e.target)
 if(correctPiece){
 
  if(takenByOpp && valid){
    e.target.parentNode.append(draggedPiece)
    console.log(initialPosition)
    e.target.firstChild?.remove()
    console.log(initialPosition)
    console.log("status:",valid)
    changePlayer()
    return
  }
  if(taken && !takenByOpp){
    alert("you can't play this move");
    setTimeout(()=>alert="",2000)
    return
  }
  if(!takenByOpp && valid){
    e.target.append(draggedPiece)
    changePlayer()

  }
 }}



function checkIfValid(target){
  const targetID=Number(target.getAttribute("square_id")) || Number(target.parentNode.getAttribute("square_id"))
  const startId=Number(initialPosition)
  console.log(startId)
  const piece=draggedPiece.id
  console.log('piece: ',piece)
  console.log('startid: ',startId)
  console.log('endDestination: ',targetID)
  switch(piece){
    case "pawn":
      const startRow=[8,9,10,11,12,13,14,15]
      if(startRow.includes(startId)&& startId + width*2 === targetID ||
      startId + width === targetID ||
      startId + width - 1 === targetID && document.querySelector(`[square_id="${startId + width - 1}"]`).firstChild ||
      startId + width + 1 === targetID && document.querySelector(`[square_id="${startId + width + 1}"]`).firstChild 

    ){
        return true
      }
      break;
  }
  return false
  


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
}


function reverseIds(){
  const allSquares= document.querySelectorAll('.square')
  allSquares.forEach((square,i) => square.setAttribute("square_id",63 - i))
}

function revertIds(){
  const allSquares= document.querySelectorAll('.square')
  allSquares.forEach((square,i) => square.setAttribute("square_id",i))

}

