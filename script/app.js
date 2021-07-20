const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.scoreDisplay')
const width = 10
let currentIndex = 0
let mcqueenIndex = 0
let currentTow = [2, 1, 0]
let direction = 1
let score = 0
const speed = 0
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
  intervalTime = 100
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
    interval = setInterval(moveOutcome, intervalTime)
  }
}

function control(e) {
  if (e.keyCode === 37) {
    direction = -1
  } else if (e.keyCode === 38) {
    direction = -width
  } else if (e.keyCode === 39) {
    direction = 1
  } else if (e.keyCode === 40) {
    direction = +width
  }
}
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keyup', control)
  createBoard()
  startGame()
})
