const LASER_SPEED = 80
var gHero

var gShootInterval
var gLaser
// creates the hero and place it on board
gHero = {
  pos: {
    i: 12,
    j: 5,
  },
  isShoot: false,
}

function createHero(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (i === gHero.pos.i && j === gHero.pos.j)
        board[i][j] = { type: SKY, gameObject: SPACE_SHIP }
    }
  }
}

// Handle game keys
function onKeyDown(ev) {
  var nextLocation = {
    i: gHero.pos.i,
    j: gHero.pos.j,
  }

  switch (ev.code) {
    case 'ArrowLeft':
      nextLocation.j--
      break
    case 'ArrowRight':
      nextLocation.j++
      break
    case 'Space':
      shoot()
      break
    default:
      break
  }

  return nextLocation
}
// Move the hero right (1) or left (-1)
function moveHero(ev) {
  if (!gGame.isOn) return

  var nextLocation = onKeyDown(ev)

  var nextCell = gBoard[gHero.pos.i][gHero.pos.j]
  // console.log(nextCell)
  if (
    (nextLocation.i === BOARD_SIZE - 2 && nextLocation.j === BOARD_SIZE) ||
    (nextLocation.i === BOARD_SIZE - 2 &&
      nextLocation.j === BOARD_SIZE - (BOARD_SIZE + 1))
  )
    return

  // TODO: Move the hero to new location
  // TODO: update the model
  gBoard[gHero.pos.i][gHero.pos.j] = { type: '', gameObject: '' }
  // TODO: update the DOM
  renderCell(gHero.pos, SKY)

  // TODO: update the model
  gHero.pos = nextLocation

  gBoard[gHero.pos.i][gHero.pos.j] = nextCell

  // TODO: update the DOM
  renderCell(gHero.pos, SPACE_SHIP)
  // console.log(gBoard)
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
  console.log('hi')
}

// renders a LASER at specific cell for short time and removes it

// Implement the function blinkLaser that uses updateCell twice:
//  to display and remove the laser in a specific cell
var pos = { i: 5, j: 8 }

blinkLaser()

function blinkLaser() {
  var laser = LASER
  var location = {
    i: gLaser.pos.i,
    j: gLaser.pos.j,
  }

  if (location.i === 0) return

  var nextCell = gBoard[location.i - 1][location.j]
  console.log(nextCell)
}
