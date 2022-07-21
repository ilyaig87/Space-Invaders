const BOARD_SIZE = 14
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3

const SPACE_SHIP = '🚀'
const ALIEN = '👽'
const LASER = '💣'

const SKY = ''
const GROUND = '⛔'

var sumOfAliens = ALIENS_ROW_LENGTH * ALIENS_ROW_COUNT
var gGameIson = false

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard

var gGame = {
  isOn: false,
  aliensCount: 0,
}

// Called when game loads
function init() {
  gBoard = createBoard()

  // createMat(gBoard, '.board-container')
  gGame.isOn = true
  renderBoard(gBoard)
  // createCell(gBoard)
  // console.log(gBoard)
}

// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
// debugger
function createBoard() {
  var board = []

  for (var i = 0; i < BOARD_SIZE; i++) {
    board.push([])

    for (var j = 0; j < BOARD_SIZE; j++) {
      board[i][j] = createCell()

      if (i === BOARD_SIZE - 1) {
        board[i][j].gameObject = GROUND
      }
    }
  }
  createHero(board)
  createAliens(board)
  // console.log(board)
  return board
}

// Render the board as a <table> to the page
function renderBoard(board) {
  var strHTML = '<table border="0"><tbody>'
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>\n'
    for (var j = 0; j < board[0].length; j++) {
      var cell = board[i][j]
      var className = 'cell cell-' + i + '-' + j
      cell.gameObject = !cell.gameObject ? '' : cell.gameObject

      strHTML += `<td class="${className}">${cell.gameObject}</td>\n`
    }
    strHTML += '</tr>\n'
  }
  strHTML += '</tbody></table>'

  const elContainer = document.querySelector('.board-container')
  elContainer.innerHTML = strHTML
}

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
  return {
    type: SKY,
    gameObject: gameObject,
  }
}
// position such as: {i: 2, j: 7}
function renderCell(pos, gameObject = null) {
  // model
  // console.log(gBoard[pos.i][pos.j])
  gBoard[pos.i][pos.j].gameObject

  //dom
  var elCell = getElCell(pos)
  elCell.innerHTML = gameObject || ''
}

// function renderCell(pos, value) {
//   console.log('pos:', pos)
//   console.log('value:', value)

//   var elCell = getElCell(pos)

//   elCell.innerText = value
// }

// location such as: {i: 2, j: 7}
// function renderCell(pos, value) {
// Select the elCell and set the value
// var elCell = document.querySelector(`.cell-${pos.i}-${pos.j}`)
// console.log(elCell)
//   elCell.innerHTML = value
// }
