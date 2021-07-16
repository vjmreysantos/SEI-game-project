// * ELEMENTS
const grid = document.querySelector('.grid')
const tiles = []



// * GRID VARIABLES
const width = 10
const tileCount = width * width



// * GAME VARIABLES
const materClass = 'mater'
let materPosition = 51



// * FUNCTIONS


function addMater() {
  tiles[materPosition].classList.add(materClass)
}
function removeMater() {
  tiles[materPosition].classList.remove(materClass)
}
function createGrid() {
  for (let i = 0; i < tileCount; i++) {
    const tile = document.createElement('div')
    tile.textContent = i
    grid.appendChild(tile)
    tiles.push(tile)
  }
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
}
createGrid()
addMater()






// * EVENTS
window.addEventListener('keyup', handleKeyUp)