function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;



    const placeMark = (row, column, player) => {
        if (board[row][column].getValue() === 0) board[row][column].addMark(player);
    }

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithValues);
    }

    return {
        getBoard,
        placeMark,
        printBoard,
    }
}

function Cell() {
    let value = 0;

    const getValue = () => value;

    const addMark = (player) => {
        value = player;
    };

    return {
        getValue,
        addMark
    };
}

function GameController(playerOneName = "Player 1", playerTwoName = "Player 2") {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            mark: 'X'
        },
        {
            name: playerTwoName,
            mark: 'O'
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1]: players[0];
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} placed an ${getActivePlayer().mark} on [${row}][${column}]`);
        board.placeMark(row, column, getActivePlayer().mark);

        // win conditions here
        // board starts at 0, so all conditions will apply at the beginning of the game.

        const boardWithValues = board.getBoard().map((row) => row.map((cell) => cell.getValue()));
        if (boardWithValues[0][0] === boardWithValues)


        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();

