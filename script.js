document.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.getElementById('message');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.querySelector('.reset button');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (cell.textContent === '' && gameActive) {
                cell.textContent = currentPlayer;
                gameBoard[index] = currentPlayer;

                if (checkWinner()) {
                    messageElement.textContent = `Player ${currentPlayer} wins!`;
                    gameActive = false;
                } else if (checkTie()) {
                    messageElement.textContent = 'It\'s a tie!';
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    messageElement.textContent = `Player ${currentPlayer}'s turn`;
                }
            }
        });
    });

    resetButton.addEventListener('click', () => {
        cells.forEach((cell) => {
            cell.textContent = '';
        });

        messageElement.textContent = 'Player X\'s turn';
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
    });

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    };

    const checkTie = () => {
        return !gameBoard.includes('') && !checkWinner();
    };
});
