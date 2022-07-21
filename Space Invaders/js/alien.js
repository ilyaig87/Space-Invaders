const ALIEN_SPEED = 500

var gIntervalAliens

// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx
var gAliensBottomRowIdx

var gAliens

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}

var gIsAlienFreeze = true

function createAliens(board) {
  gAliens = []
  for (var i = 0; i < ALIENS_ROW_COUNT; i++) {
    for (var j = 0; j < ALIENS_ROW_LENGTH; j++) {
      // for (var j = 0; j < board[i].length; j++) {
      //   if (j > 2 && j < 11) {
      board[i][j] = createCell(ALIEN)
    }
  }
  // }
  // gIntervalAliens = setInterval(moveAliens, ALIEN_SPEED)
}

function handleAlienHit(pos) {}
function shiftBoardRight(board, fromI, toI) {}
function shiftBoardLeft(board, fromI, toI) {}
function shiftBoardDown(board, fromI, toI) {}

// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
moveAliens()

function moveAliens() {}

function getMoveDiff() {
  var randNum = getRandomInt(1, 100)

  if (randNum <= 25) {
    return { i: 0, j: 1 }
  } else if (randNum <= 50) {
    return { i: -1, j: 0 }
  } else if (randNum <= 75) {
    return { i: 0, j: -1 }
  } else {
    return { i: 1, j: 0 }
  }
}
