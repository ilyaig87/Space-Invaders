'use strict'

function updateCell(pos, gameObject = null) {
  gBoard[pos.i][pos.j].gameObject = gameObject
  var elCell = getElCell(pos)
  elCell.innerHTML = gameObject || ''
}

function getElCell(pos) {
  var elPosition = document.querySelector(`.cell-${pos.i}-${pos.j}`)
  // console.log(elPosition)

  return elPosition
}

function copyBoard(board) {
  var newBoard = []
  for (var i = 0; i < board.length; i++) {
    newBoard[i] = []
    for (var j = 0; j < board[0].length; j++) {
      newBoard[i][j] = board[i][j]
    }
  }
  return newBoard
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

//Find empty cell, only in the first row
function getEmptyCell(board) {
  var emptyCells = []

  for (var i = 0; i < 1; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var cell = board[i][j]

      if (!cell.gameObject) emptyCells.push({ cell, i, j })
    }
  }
  // console.log('emptyCells:', emptyCells)

  var idx = getRandomIntInclusive(0, emptyCells.length - 1)
  cell = emptyCells[idx]
  // console.log('cell:', cell)
  return cell
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}
