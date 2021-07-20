const grid = document.querySelector('.grid')
const cells = []

const width = 20
const cellCount = width * width

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }
}


createGrid()

document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')

  const currentIndex = 0
  let lightningMcqueenIndex = 0
  let towMaterIndex = [2, 1, 0]
  let direction = 1
  let score = 0
  const speed = 20
  let intervalTime = 0
  let interval = 0



  function startGame() {
    towMaterIndex.forEach((index) => squares[index].classList.remove('towMater'))
    squares[lightningMcqueenIndex].classList.remove('lightningMcqueen')
    clearInterval(interval)
    score = 0
    randomLightningMcqueen()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 500
    towMaterIndex = [2, 1, 0]
    towMaterIndex.forEach((index) => squares[index].classList.add('towMater'))
    interval = setInterval(moveOutComes, intervalTime)
  }

  function randomLightningMcqueen() {
    do {
      lightningMcqueenIndex = Math.floor(Math.random() * squares.length)
    } while (squares[lightningMcqueenIndex].classList.contains('towMater'))
    squares[lightningMcqueenIndex].classList.add('lightningMcqueen')
  }

  function moveOutComes() {
    if (
      (towMaterIndex[0] + width >= width * width && direction === width) ||
      (towMaterIndex[0] % width === width - 1 && direction === 1) ||
      (towMaterIndex[0] % width === 0 && direction === -1) ||
      (towMaterIndex[0] - width < 0 && direction === -width) ||
      squares[towMaterIndex[0] + direction].classList.contains('towMater')
    ) {
      alert('Game over!')
      return clearInterval(interval)
    }

    const tail = towMaterIndex.pop()
    squares[tail].classList.remove('towMater')
    towMaterIndex.unshift(towMaterIndex[0] + direction)


    if (squares[towMaterIndex[0]].classList.contains('lightningMcqueen')) {
      squares[towMaterIndex[0]].classList.remove('lightningMcqueen')
      squares[tail].classList.add('towMater')
      towMaterIndex.push(tail)
      randomLightningMcqueen()
      score = score + 1000
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime - speed
      interval = setInterval(moveOutComes, intervalTime)
    }
    squares[towMaterIndex[0]].classList.add('towMater')
  }

  function control(e) {
    squares[currentIndex].classList.remove('towMater')
    if (e.keyCode === 39) {
      direction = 1
    } else if (e.keyCode === 38) {
      direction = -width
    } else if (e.keyCode === 37) {
      direction = -1
    } else if (e.keyCode === 40) {
      direction = +width
    }
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)
})
