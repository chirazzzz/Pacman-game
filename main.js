const width = 28
const gameGrid = document.querySelector(".grid")
const scoreDisplay = document.querySelector("#score")
let squares = []
scoreDisplay.textContent = '23'

// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
  1,0,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
  1,0,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,0,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,0,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,0,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,1,1,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

// create board
function createBoard() {
  //create layout.length amount of these elements with a for loop
  for (let i = 0; i < layout.length; i++) {
    // create element
    const square = document.createElement('div')
    // add square into grid
    gameGrid.appendChild(square)
    // push square into new squares array
    squares.push(square)
    
    
    // add styling class depending on layout key - 0,1,2,3,4
    if(layout[i] === 0) {
      square.classList.add('pac-dot')
    } else if (layout[i] === 1) {
      square.classList.add('wall')
    } else if (layout[i] === 2) {
      square.classList.add('ghost-lair')
    } else if (layout[i] === 3) {
      square.classList.add('power-pellet')
    } 
  }
}

createBoard()

// starting position of pacman
let pacmanCurrentIndex = 490;

squares[pacmanCurrentIndex].classList.add('pacman')

function control(e) {
  squares[pacmanCurrentIndex].classList.remove('pacman')
  switch(e.key) {
    case 'ArrowRight':
      console.log('right pressed')
      if (pacmanCurrentIndex % width < (width - 1)) {
        squares[pacmanCurrentIndex + 1].classList.add('pacman')
        pacmanCurrentIndex++
      }
      break
    case 'ArrowUp':
      console.log('up pressed')
      if (pacmanCurrentIndex - width >= 0) {
        squares[pacmanCurrentIndex - width].classList.add('pacman')
        pacmanCurrentIndex -= width
      }
      break
    case 'ArrowLeft':
      console.log('left pressed')
      if (pacmanCurrentIndex % width !== 0) {
        squares[pacmanCurrentIndex - 1].classList.add('pacman')
        pacmanCurrentIndex--
      }
      break
    case 'ArrowDown':
      console.log('down pressed')
      if (pacmanCurrentIndex + width < (width * width)) {
        squares[pacmanCurrentIndex + width].classList.add('pacman')
        pacmanCurrentIndex += width
      }
      break
  }
}

// addEventListener to entire document so it hears all keypresses
document.addEventListener('keydown', control)