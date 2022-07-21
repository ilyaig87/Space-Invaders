'use strict'

function getElCell(pos) {
  var elPosition = document.querySelector(`.cell-${pos.i}-${pos.j}`)
  // console.log(elPosition)

  return elPosition
}

function createMat(ROWS, COLS) {
  var mat = []
  for (var i = 0; i < ROWS; i++) {
    var row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}
function copyMat(mat) {
  var newMat = []
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = []
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j]
    }
  }
  return newMat
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

function shuffle(array) {
  var j, x

  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = array[i]
    array[i] = array[j]
    array[j] = x
  }

  return array
}

// location such as: {i: 2, j: 7}
// function renderCell(location, value) {
//   // Select the elCell and set the value
//   const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//   elCell.innerHTML = value
// }

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getTime() {
  return new Date().toString().split(' ')[4]
}

function startTimer() {
  var startTime = Date.now()

  gGameInterval = setInterval(() => {
    var seconds = ((Date.now() - startTime) / 1000).toFixed(3)
    var elSpan = document.querySelector('.timer')
    elSpan.innerText = `timer: ${seconds}`
  }, 59)
}

function getNeighboursAroundCount(cellI, cellJ, mat) {
  var negAroundCount = 0

  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue

    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue
      if (j < 0 || j >= mat[i].length) continue
      if (mat[i][j] === 'SOMETHING') negAroundCount++
    }
  }
  return negAroundCount
}

function findBestPos(board) {
  var maxFoodCount = 0
  var bestPos = null
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j] === FOOD) continue
      var count = countFoodAround(board, i, j)
      if (count > maxFoodCount) {
        maxFoodCount = count
        bestPos = { i: i, j: j }
      }
    }
  }
  return bestPos
}

function getRandEmptyLocation() {
  var emptyCells = []
  for (var i = 1; i < SIZE - 1; i++) {
    for (var j = 1; j < SIZE[i] - 1; j++) {
      if (gBoard[i][j] === EMPTY) emptyCells.push({ i, j })
    }
  }
  var idx = getRandomIntInclusive(0, emptyCells.length - 1)
  return emptyCells[idx]
}

function getEmptyCells() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {}
  }
}

// Returns the class name for a specific cell
// function getClassName(location) {
//   var cellClass = `cell-${location.i}-${location.j}`
//   return cellClass
// }

setTimeout(() => {}, 3000)

function sortByName(name) {
  name.sort((p1, p2) => p1.name.localeCompare(p2.name))

  return gStudents
}

function sortByNum(num) {
  num.sort((p1, p2) => p1.AverageGrade - p2.AverageGrade)
  return num
}

function printPrimaryDiagonal(squareMat) {
  for (var d = 0; d < squareMat.length; d++) {
    var item = squareMat[d][d]
    console.log(item)
  }
}
function printSecondaryDiagonal(squareMat) {
  for (var d = 0; d < squareMat.length; d++) {
    var item = squareMat[d][squareMat.length - d - 1]
    console.log(item)
  }
}

// setTimeout(() => alert('Times up!'), 3000)
