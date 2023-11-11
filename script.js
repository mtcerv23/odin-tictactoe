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

    let topRow;
    let midRow;
    let botRow;
    let leftCol;
    let midCol;
    let rightCol;
    let leftDiag;
    let rightDiag;
    let boardWithValues;
    let winner;


    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} placed an ${getActivePlayer().mark} on [${row}][${column}]`);
        board.placeMark(row, column, getActivePlayer().mark);

        // win conditions here
        // Board starts at 0, so all conditions will apply at the beginning of the game. How to deal with this?

        boardWithValues = board.getBoard().map((row) => row.map((cell) => cell.getValue()));

        topRow = boardWithValues[0];
        midRow = boardWithValues[1];
        botRow = boardWithValues[2];
        leftCol = [boardWithValues[0][0], boardWithValues[1][0], boardWithValues[2][0]];
        midCol = [boardWithValues[0][1], boardWithValues[1][1], boardWithValues[2][1]];
        rightCol = [boardWithValues[0][2], boardWithValues[1][2], boardWithValues[2][2]];
        leftDiag = [boardWithValues[0][0], boardWithValues[1][1], boardWithValues[2][2]];
        rightDiag = [boardWithValues[0][2], boardWithValues[1][1], boardWithValues[2][0]];

        let winCombos = [topRow, midRow, botRow, leftCol, midCol, rightCol, leftDiag, rightDiag];

        if (winCombos.find((combo) => combo[0] !== 0 && combo[0] === combo[1] && combo[0] === combo[2])) {
            winner = activePlayer;
        }

        if (winner) {
            console.log(`${winner.name} wins!`);
            return;
        }

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

