'use strict'

const BOARD_SIZE = 14
var gAliensRowLength = 8
var gAliensRowCount = 3

const HERO = '🚀'
const ALIEN = '👽'
const LASER = '💣'
const SUPER_LASER = '^'
const CANDY = '🍬'
const SKY = ''
const GROUND = '⛔'
var sumOfAliens = gAliensRowLength * gAliensRowCount

var gIsVictory = false
var gBoard
var gScore

var gIntervalCandy
var gIntervalRemoveCandy

var gGame = {
  isOn: false,
  aliensCount: 0,
}

// Called when game loads
function init() {
  gBoard = createBoard()
  gScore = 0

  renderBoard(gBoard)
  sumOfAliens = gAliensRowLength * gAliensRowCount
  if (!gGame.isOn) return

  gIntervalCandy = setInterval(addCandy, 10000)

  moveAliens()
}

function start() {
  var elbtn1 = document.querySelector('.btn1')
  var elbtn2 = document.querySelector('.btn2')
  elbtn1.style.visibility = 'hidden'
  elbtn2.style.visibility = 'visible'

  gGame.isOn = true
  init()

  // var elbtn2 = document.querySelector('.btn2')
  // elbtn2.style.visibility = 'invisible'
}
function restart() {
  var elModal = document.querySelector('.modal')
  elModal.style.visibility = 'hidden'
  // var elbtn1 = document.querySelector('.btn1')
  // var elbtn2 = document.querySelector('.btn2')

  gGame.isOn = true
  updateHero()

  gAliensTopRowIdx = 0
  gAliensBottomRowIdx = gAliensRowCount - 1
  gIsAlienFreeze = false
  gCanShiftRight = true
  gCanShiftLeft = false
  gCanShiftDown = false

  clearInterval(gIntervalAliensRight)
  clearInterval(gIntervalAliensLeft)
  clearInterval(gIntervalAliensDown)
  clearInterval(gIntervalCandy)
  clearInterval(gIntervalRemoveCandy)

  init()
}

// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens

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

function updateScore(score) {
  var gElScore = document.querySelector('span')

  gScore += score
  gElScore.innerText = gScore
  checkIsVictory()
}

function checkIsVictory() {
  console.log(gGame.aliensCount, 'gGame.aliensCount')
  console.log(sumOfAliens, 'sumOfAliens')
  return gGame.aliensCount === sumOfAliens
    ? (gIsVictory = true)
    : (gIsVictory = false)
}

function gameOver() {
  var elModal = document.querySelector('.modal')
  var elBtn2 = document.querySelector('.btn2')
  elModal.style.visibility = 'visible'

  if (gIsVictory) {
    elModal.innerText = 'You killed them all! - You-Won!'
    elBtn2.style.visibility = 'visible'
  } else {
    elModal.innerText = 'You Lost!'
  }
  gGame.isOn = false

  clearInterval(gIntervalAliensRight)
  clearInterval(gIntervalAliensLeft)
  clearInterval(gIntervalAliensDown)
  clearInterval(gIntervalCandy)
  clearInterval(gIntervalRemoveCandy)
}

function addCandy() {
  var cell = getEmptyCell(gBoard)

  updateCell({ i: cell.i, j: cell.j }, CANDY)
  gIntervalRemoveCandy = setTimeout(removeCandy, 5000, cell.i, cell.j)
}

function removeCandy(i, j) {
  updateCell({ i, j }, '')
}

function setLevel(rowLength, rowCount, speed) {
  gAliensRowLength = rowLength
  gAliensRowCount = rowCount
  ALIEN_SPEED = speed
}
