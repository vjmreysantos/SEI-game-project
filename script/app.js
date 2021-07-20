// const grid = document.querySelector('.grid')
// const tiles = []
// const newGame = document.querySelector('.new-game')
// const scoreDisplay = document.querySelector('#score-value')



// // * GRID VARIABLES
// const width = 10
// const tileCount = width * width



// // * GAME VARIABLES
// const materClass = 'mater'
// const mcqueenClass = 'mcqueen'
// let materPosition = 51
// let mcqueenPosition = 57
// let score = 0


// // * FUNCTIONS

// function addMater() {
//   tiles[materPosition].classList.add(materClass)
// }
// function removeMater() {
//   tiles[materPosition].classList.remove(materClass)
// }

// function addMcqueen() {
//   tiles[mcqueenPosition].classList.add(mcqueenClass)
// }
// function removeMcqueen() {
//   tiles[mcqueenPosition].classList.remove(mcqueenClass)
// }

// function createGrid() {
//   for (let i = 0; i < tileCount; i++) {
//     const tile = document.createElement('div')
//     tile.textContent = i
//     grid.appendChild(tile)
//     tiles.push(tile)
//   }
// }
// createGrid()
// addMcqueen()
// addMater()

// function towMcqueen(tiles, tail) {
//   if (tiles[materPosition[0]].classList.contains('mcqueen')) {
//     tiles[materPosition[0]].classList.remove('mcqueen')
//     tiles[tail].classList.add('mcqueen')
//     materPosition.push(tail)
//     randomMcqueen(tiles)
//     score++
//     scoreDisplay.textContent = score
//     clearInterval(interval)
//     intervalTime = intervalTime * speed
//     interval = setInterval(moveOutcome, intervalTime)
//   }
// }

// function randomMcqueen(tiles) {
//   do {
//     mcqueenPosition = Math.floor(Math.random() * tiles.length)
//   } while (tiles[mcqueenPosition].classList.contains('mater'))
//   tiles[materPosition].classList.add('mcqueen')
// }

// function handleNewGame() {
//   setInterval(() => {
//     tiles[materPosition].classList.add('mater')
//     materPosition++
//   }, 500)

// }


// function handleKeyUp(event) {
//   const x = materPosition % width
//   const y = Math.floor(materPosition / width)
//   removeMater()

//   switch (event.keyCode) {
//     case 39:
//       if (x < width - 1) {
//         materPosition++
//       }
//       break
//     case 37:
//       if (x > 0) {
//         materPosition--
//       }
//       break
//     case 38:
//       if (y > 0) {
//         materPosition -= width
//       }
//       break
//     case 40:
//       if (y < width - 1) {
//         materPosition += width
//       }
//       break
//   }
// }

// // * EVENTS
// window.addEventListener('keyup', handleKeyUp)
// newGame.addEventListener('click', handleNewGame)



const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.scoreDisplay')
const width = 10
let currentIndex = 0
let mcqueenIndex = 0
let currentTow = [2, 1, 0]
let direction = 1
let score = 0
const speed = 100
let intervalTime = 0
let interval = 0



function createBoard() {
  for (let i = 0; i < 100; i++) {
    const div = document.createElement('div')
    grid.appendChild(div)
  }
}

function randomMcqueen(squares) {
  do {
    mcqueenIndex = Math.floor(Math.random() * squares.length)
  } while (squares[mcqueenIndex].classList.contains('tow'))
  squares[mcqueenIndex].classList.add('mcqueen')
}

function startGame() {
  const squares = document.querySelectorAll('.grid div')
  randomMcqueen(squares)
  
  direction = 1
  scoreDisplay.innerHTML = score
  intervalTime = 1000
  currentTow = [2, 1, 0]
  currentIndex = 0
  currentTow.forEach((index) => squares[index].classList.add('tow'))
  interval = setInterval(moveOutcome, intervalTime)
}


function moveTow(squares) {
  const tail = currentTow.pop()
  squares[tail].classList.remove('tow')
  currentTow.unshift(currentTow[0] + direction)

  eatMcqueen(squares, tail)
  squares[currentTow[0]].classList.add('tow')
}


function moveOutcome() {
  const squares = document.querySelectorAll('.grid div')
  if (checkForHits(squares)) {
    alert('Game Over')
    return clearInterval(interval)
  } else {
    moveTow(squares)
  }
}

function checkForHits(squares) {
  if (
    (currentTow[0] + width >= width * width && direction === width),
    (currentTow[0] % width === width - 1 && direction === 1),
    (currentTow[0] % width === 0 && direction === -1),
    (currentTow[0] - width <= 0 && direction === -width),
    squares[currentTow[0] + direction].classList.contains('tow')
  ) {
    return true
  }
}

function eatMcqueen(squares, tail) {
  if (squares[currentTow[0]].classList.contains('mcqueen')) {
    squares[currentTow[0]].classList.remove('mcqueen')
    squares[tail].classList.add('mcqueen')
    currentTow.push(tail)
    randomMcqueen(squares)
    score++
    scoreDisplay.textContent = score
    clearInterval(interval)
    intervalTime = intervalTime * speed
    interval = setInterval(moveOutcome, intervalTime)
  }
}

function control(e) {
  if (e.keyCode === 37) {
    direction = -1 // press D, snake goes right
  } else if (e.keyCode === 38) {
    direction = -width // Press W, snake goes up (move ten divs)
  } else if (e.keyCode === 39) {
    direction = 1 // press A, snake goes left
  } else if (e.keyCode === 40) {
    direction = +width // press S, snake goes down (instantly appear in the div ten divs from where we are now)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keyup', control)
  createBoard()
  startGame()
})

