const cells = document.querySelectorAll('.cell')
const turn = document.querySelector('#turn')
const result = document.querySelector('#result')
const reset = document.querySelector('#reset-button')


let currentTurn = 'x'
let board = ['', '', '', '', '', '', '', '', '']
let gameActive = true


function checkWin() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    for (i = 0; i < winCombinations.length; i++) {
        const [a, b, c] = winCombinations[i]
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]
        }
    }
    if (board.every(cell => cell !== '')) {
        return 'Ничья'
    }
    return null


}

function changeTurn() {
    currentTurn = currentTurn === 'x' ? 'o' : 'x'
    turn.textContent = `Ход: ${currentTurn}`
}

function handleCellClick(e) {
    const cellIndex = parseInt(e.target.dataset.index)


    if (board[cellIndex] || !gameActive) return

    board[cellIndex] = currentTurn
    e.target.classList.add(currentTurn)
    e.target.textContent = currentTurn

    const winner = checkWin()

    if (winner) {
        result.textContent = winner === 'Ничья' ? 'Ничья' : `${winner} победил!`
        gameActive = false
    } else {
        changeTurn()
    }

}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']
    currentTurn = 'x'
    gameActive = true
    turn.textContent = `Ход: ${currentTurn}`
    result.textContent = ''
    cells.forEach(cell => {
        cell.classList.remove('x', 'o')
        cell.textContent = ''
    })
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick))
reset.addEventListener('click', resetGame)


















