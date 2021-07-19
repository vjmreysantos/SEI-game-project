const grid = document.querySelector('.grid')
const tiles = []
const newGame = document.querySelector('.new-game')
const scoreDisplay = document.querySelector('#score-value')



// * GRID VARIABLES
const width = 10
const tileCount = width * width



// * GAME VARIABLES
const materClass = 'mater'
const mcqueenClass = 'mcqueen'
let materPosition = 51
let mcqueenPosition = 57
let score = 0


// * FUNCTIONS

function addMater() {
  tiles[materPosition].classList.add(materClass)
}
function removeMater() {
  tiles[materPosition].classList.remove(materClass)
}

function addMcqueen() {
  tiles[mcqueenPosition].classList.add(mcqueenClass)
}
function removeMcqueen() {
  tiles[mcqueenPosition].classList.remove(mcqueenClass)
}

function createGrid() {
  for (let i = 0; i < tileCount; i++) {
    const tile = document.createElement('div')
    tile.textContent = i
    grid.appendChild(tile)
    tiles.push(tile)
  }
}

function handleNewGame() {
  setInterval(() => {
    tiles[materPosition].classList.add('mater')
    materPosition++
  }, 500)
}

function handleMcqueen() {
  setInterval(() => {
    tiles[mcqueenPosition].classList.remove('mcqueen')
    mcqueenPosition = Math.floor(Math.random() * tileCount)
    tiles[mcqueenPosition].classList.add('mcqueen')
  }, 2000)
}


function handleKeyUp(event) {
  const x = materPosition % width
  const y = Math.floor(materPosition / width)
  removeMater()

  switch (event.keyCode) {
    case 39:
      if (x < width - 1) {
        materPosition++
      }
      break
    case 37:
      if (x > 0) {
        materPosition--
      }
      break
    case 38:
      if (y > 0) {
        materPosition -= width
      }
      break
    case 40:
      if (y < width - 1) {
        materPosition += width
      }
      break
  }
  addMater()
  addMcqueen()
}
createGrid()
addMater()
addMcqueen()




// * EVENTS
window.addEventListener('keyup', handleKeyUp)
newGame.addEventListener('click', handleNewGame, handleMcqueen)