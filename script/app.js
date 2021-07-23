const grid = document.querySelector('.grid')
const cells = []

const width = 10
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
  const audioBtn = document.querySelector('.toggle-audio')

  const currentIndex = 0
  let lightningMcqueenIndex = 0
  let towMaterIndex = [2, 1, 0]
  let oilSpillIndex = 0
  let barrierIndex = 0
  let direction = 1
  let score = 0
  const speed = 10
  let intervalTime = 0
  let interval = 0


  function startGame() {
    document.querySelector('.background').play()
    document.querySelector('.background').volume = 0.1
    towMaterIndex.forEach((index) => squares[index].classList.add('towMater'))
    randomLightningMcqueen()
    randomOilSpill()
    randomBarrier()
    score = 0
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 300
    towMaterIndex = [2, 1, 0]
    interval = setInterval(moveOutComes, intervalTime)
  }

  function randomLightningMcqueen() {
    do {
      lightningMcqueenIndex = Math.floor(Math.random() * squares.length)
    } while (squares[lightningMcqueenIndex].classList.contains('towMater'))
    squares[lightningMcqueenIndex].classList.add('lightningMcqueen')
  }

  function randomOilSpill() {
    do {
      oilSpillIndex = Math.floor(Math.random() * squares.length)
    } while (squares[oilSpillIndex].classList.contains('towMater'))
    squares[oilSpillIndex].classList.add('oilSpill')
  }

  function randomBarrier() {
    do {
      barrierIndex = Math.floor(Math.random() * squares.length)
    } while (squares[barrierIndex].classList.contains('towMater'))
    squares[barrierIndex].classList.add('barrier')
  }

  function moveOutComes() {
    if (
      (towMaterIndex[0] + width >= width * width && direction === width) ||
      (towMaterIndex[0] % width === width - 1 && direction === 1) ||
      (towMaterIndex[0] % width === 0 && direction === -1) ||
      (towMaterIndex[0] - width < 0 && direction === -width) ||
      squares[towMaterIndex[0] + direction].classList.contains('towMater') ||
      squares[towMaterIndex[0] + direction].classList.contains('barrier')
    ) {

      document.querySelector('.crash').play(),
      document.querySelector('.crash').volume = 0.1,
      document.querySelector('.background').pause()

      const playAgain = window.confirm('Game Over! Try again?')

      if (!playAgain) {
        alert('Thank you for playing!')
        window.location.reload()
      } else {
        alert('Click Start button to Play')
        window.location.reload()
      }
    }

    const tail = towMaterIndex.pop()
    squares[tail].classList.remove('towMater')
    towMaterIndex.unshift(towMaterIndex[0] + direction)

    if (squares[towMaterIndex[0]].classList.contains('lightningMcqueen')) {
      squares[towMaterIndex[0]].classList.remove('lightningMcqueen')
      document.querySelector('.beep').play()
      document.querySelector('.beep').volume = 0.1
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

    if (squares[towMaterIndex[0]].classList.contains('oilSpill')) {
      squares[towMaterIndex[0]].classList.remove('oilSpill')
      document.querySelector('.splooge').play()
      document.querySelector('.splooge').volume = 0.1
      randomOilSpill()
      score = score - 1000
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = 500
      interval = setInterval(moveOutComes, intervalTime)
    }
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
    } else {
      e.default()
      return false
    }
  }

  function muteBgMusic() {
    if (document.querySelector('.background').play()) {
      document.querySelector('.background').pause()
    }
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)
  audioBtn.addEventListener('click', muteBgMusic)
})
