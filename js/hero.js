const LASER_SPEED = 80

var gHero
var gLaser
var gLasers = []

var gBlinkLaserInterval
// creates the hero and place it on board

gHero = {
  pos: {
    i: 12,
    j: 5,
  },
  isShoot: false,
  isSuperAttack: false,
  superAttacksCount: 3,
  isShootNeighbors: false,
}

gLaser = {
  pos: {
    i: 11,
    j: 5,
  },
}

function createHero(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (i === gHero.pos.i && j === gHero.pos.j)
        board[i][j] = { type: SKY, gameObject: HERO }
    }
  }
}

// Handle game keys
function onKeyDown(ev) {
  var nextLocation = {
    i: gHero.pos.i,
    j: gHero.pos.j,
  }

  switch (ev.key) {
    case 'ArrowLeft':
      nextLocation.j--
      break
    case 'ArrowRight':
      nextLocation.j++
      break
    case ' ':
      shoot()
      break
    case 'n':
      gHero.isShootNeighbors = true
      shoot()
      break

    case 'x':
      gHero.isSuperAttack = gHero.superAttacksCount === 0 ? false : true
      if (gHero.isSuperAttack) shoot()
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

  // var nextCell = gBoard[gHero.pos.i][gHero.pos.j]
  // console.log(nextLocation)
  if (
    (nextLocation.i === BOARD_SIZE - 2 && nextLocation.j === BOARD_SIZE) ||
    (nextLocation.i === BOARD_SIZE - 2 &&
      nextLocation.j === BOARD_SIZE - (BOARD_SIZE + 1))
  )
    return

  // TODO: Move the hero to new location
  // TODO: update the model
  gBoard[gHero.pos.i][gHero.pos.j] = createCell('')
  // TODO: update the DOM
  updateCell(gHero.pos, '')

  gHero.pos = nextLocation

  // TODO: update the model
  gBoard[gHero.pos.i][gHero.pos.j] = createCell(HERO)

  // TODO: update the DOM
  updateCell(gHero.pos, HERO)
  // console.log(gBoard)
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
  if (!gGame.isOn) return
  // only one shoot on board
  if (gHero.isShoot) return

  gHero.isShoot = true

  var laserPos = {
    i: gHero.pos.i - 1,
    j: gHero.pos.j,
  }

  var laserSpeed = LASER_SPEED

  if (gHero.isSuperAttack) {
    laserSpeed *= 0.5
    gHero.superAttacksCount--
    gHero.isSuperAttack = false
  }

  gBlinkLaserInterval = setInterval(() => {
    blinkLaser(laserPos)
    laserPos.i--

    if (gBoard[laserPos.i][laserPos.j].gameObject === ALIEN) {
      updateScore(10)
      gGame.aliensCount++

      if (gHero.isShootNeighbors) {
        shootNeighbors(laserPos)
        gHero.isShootNeighbors = false
      }
    } else if (gBoard[laserPos.i][laserPos.j].gameObject === CANDY) {
      updateScore(50)
    }

    if (
      gBoard[laserPos.i][laserPos.j].gameObject === ALIEN ||
      laserPos.i === 0
    ) {
      clearInterval(gBlinkLaserInterval)
      updateCell(laserPos, '')
      gHero.isShoot = false
      if (checkIsVictory()) gameOver()
    }
  }, laserSpeed)
}

// renders a LASER at specific cell for short time and removes it
// Implement the function blinkLaser that uses updateCell twice:
//  to display and remove the laser in a specific cell

function blinkLaser(pos) {
  var elSuper = document.querySelector('h4')
  // console.log('elSuper:', elSuper)

  var laser
  laser = gHero.isSuperAttack ? SUPER_LASER : LASER

  gBoard[gLaser.pos.i][gLaser.pos.j] = createCell(SKY)
  updateCell({ i: pos.i, j: pos.j }, laser)
  elSuper.innerText = `Super Atacks left:${gHero.superAttacksCount}`
  gBoard[pos.i][pos.j].gameObject = ''
  setTimeout(updateCell, LASER_SPEED, { i: pos.i, j: pos.j })
}

function updateHero() {
  gHero.superAttacksCount = 3
}

function shootNeighbors(pos) {
  var countAliens = 0
  for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i > gBoard.length) continue
    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j > gBoard[i].length) continue
      if (i === pos.i && j === pos.j) continue
      if (gBoard[i][j].gameObject === ALIEN) countAliens++
      updateCell({ i, j })
    }
  }
  gGame.aliensCount += countAliens

  // score for removing ALIEN neighbors
  updateScore(countAliens * 10)
}
