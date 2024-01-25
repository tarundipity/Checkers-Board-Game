/*------- Set the board -------*/
const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

/*------- Set Cached Variables -------*/

//parse each pieces ID and return the index of the piece (the position of the piece on the board)
let findPiece = function (pieceID) {
    let parsed = parseInt(pieceID);
    return board.indexOf(parsed);
};

//reference to DOM
const cells = document.querySelectorAll("td");
let purplePieces = document.querySelectorAll("p");
let whitePieces = document.querySelectorAll("span");
const purpleTurnText = document.querySelectorAll(".purple-turn-text");
const whiteTurnText = document.querySelectorAll(".white-turn-text");
const divider = document.querySelector("#divider");

// player properties
let turn = true;
let purpleScore = 12;
let whiteScore = 12;
let playerPieces;

//pieces properties 
let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}

/*------- Event Listeners -------*/

// initialize event listeners on both purple and white pieces
function givePiecesEventListeners() {
    if (turn) {
        for (let i = 0; i < purplePieces.length; i++) {
            purplePieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < whitePieces.length; i++) {
            whitePieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}

/*------- Logic for Game -------*/

// function holds length of the players piece count
function getPlayerPieces() {
    if (turn) {
        playerPieces = purplePieces;
    } else {
        playerPieces = whitePieces;
    }
    removeCellonclick(); // new function that removes possible moves from previously selected piece
    resetBorders(); //resets border to default if a piece was selected
}

// function that removes possible moves from previously selected piece
function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

// resets border to default if a piece was selected
function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1 px solid whitesmoke";
    }
    resetSelectedProperties(); // new function that resets piece properties 
    getSelectedPiece(); // gets ID and index of the cell/piece that was selected
}

// function that resets piece properties 
function resetSelectedProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}

//gets ID and index of the cell/piece that was selected
function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing(); // function that checks if the selected piece is a king
}

function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpaces(); //gets the moves the selected piece can make
}

// function gets the moves the selected piece can make
function getAvailableSpaces() {
    if (board[selectedPiece.indexOfBoardPiece + 7] === null &&
        cells[selectedPiece.indexOfBoardPiece + 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.seventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece + 9] === null &&
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.ninthSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 7] === null &&
        cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.minusSeventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece + 9] === null &&
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.minusNinthSpace = true;
    }
    checkAvailableJumpSpaces();
}

// function gets the moves that the selected piece can jump to 
function checkAvailableJumpSpaces() {
    if (turn) {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null
            && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
            && board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
            selectedPiece.fourteenthSpace = true;
        }

        if (board[selectedPiece.indexOfBoardPiece + 18] === null
            && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
            && board[selectedPiece.indexOfBoardPiece + 9] >= 12) {
            selectedPiece.eighteenthSpace = true;
        }

        if (board[selectedPiece.indexOfBoardPiece - 14] === null
            && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
            && board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
            selectedPiece.minusFourteenthSpace = true;
        }

        if (board[selectedPiece.indexOfBoardPiece - 18] === null
            && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
            && board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
            selectedPiece.minusEighteenthSpace = true;
        }
    }

    else {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null
            && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
            && board[selectedPiece.indexOfBoardPiece + 7] < 12
            && board[selectedPiece.indexOfBoardPiece + 7] !== null) {
            selectedPiece.fourteenthSpace = true;
        }

        if (board[selectedPiece.indexOfBoardPiece + 18] === null
            && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
            && board[selectedPiece.indexOfBoardPiece + 9] < 12
            && board[selectedPiece.indexOfBoardPiece + 9] !== null) {
            selectedPiece.eighteenthSpace = true;
        }

        if (board[selectedPiece.indexOfBoardPiece - 14] === null
            && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
            && board[selectedPiece.indexOfBoardPiece - 7] < 12
            && board[selectedPiece.indexOfBoardPiece - 7] !== null) {
            selectedPiece.minusFourteenthSpace = true;
        }

        if (board[selectedPiece.indexOfBoardPiece - 18] === null
            && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
            && board[selectedPiece.indexOfBoardPiece - 9] < 12
            && board[selectedPiece.indexOfBoardPiece - 9] !== null) {
            selectedPiece.minusEighteenthSpace = true;
        }
    }
    checkPieceCondition(); // function that restricts movement if the piece is a king
}

// function that restricts movement if the piece is a king
function checkPieceCondition() {
    if (selectedPiece.isKing) {
        givePieceBorder(); // function gives border to selected pieces to indicate that they are selected
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        } else {
            selectedPiece.seventhSpace = false;
            selectedPiece.ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;
        }
        givePieceBorder();
    }
}

// function gives border to selected pieces to indicate that they are selected (shows its movable)
function givePieceBorder() {
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace
        || selectedPiece.eighteenthSpace || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace
        || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
        document.getElementById(selectedPiece.pieceId).style.border = "3px solid green";
        giveCellsClick(); // functions gives the cell on the board a click based on possible moves
    }
    else {
        return;
    }
}

// functions gives the cell on the board a click based on possible moves
function giveCellsClick() {
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (selectedPiece.eighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (selectedPiece.minusNinthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
    }
    if (selectedPiece.minusEighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");
    }
}

// funtions moves the piece to the position that was clicked 
function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
    if (turn) {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="purple-piece king" id="${selectedPiece.pieceId}"></p>`;
            purplePieces = document.querySelectorAll("p");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="purple-piece" id="${selectedPiece.pieceId}"></p>`;
            purplePieces = document.querySelectorAll("p");
        }
    } else {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="white-piece king" id="${selectedPiece.pieceId}"></span>`;
            whitePieces = document.querySelectorAll("span");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="white-piece" id="${selectedPiece.pieceId}"></span>`;
            whitePieces = document.querySelectorAll("span");
        }
    }

    let indexOfPiece = selectedPiece.indexOfBoardPiece

    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

// function changes the boards states data on the back end
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);

    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }

    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }

    if (removePiece) {
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            whiteScore--;
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            purpleScore--;
        }
    }
    resetSelectedProperties();
    removeCellonclick();
    removeEventListener();
}

// function removes the "onClick" even listener for pieces
function removeEventListener() {
    if (turn) {
        for (let i = 0; i < purplePieces.length; i++) {
            purplePieces[i].removeEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < whitePieces.length; i++) {
            whitePieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    checkForWin();
}

// function checks for a win

function checkForWin() {
    if (whiteScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < purpleTurnText.length; i++) {
            purpleTurnText[i].style.colour = "purple";
            purpleTurnText[i].style.bold;
            whiteTurnText[i].style.display = "none";
            purpleTurnText[i].textContent = "purple WINS!!!"
        }
    } else if (purpleScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < whiteTurnText.length; i++) {
            whiteTurnText[i].style.colour = "purple";
            whiteTurnText[i].style.bold;
            purpleTurnText[i].style.display = "none";
            whiteTurnText[i].textContent = "white WINS!!!"
        }
    }
    changePlayer();
}

function changePlayer() {
    if (turn) {
        turn = false;
        for (let i = 0; i < purpleTurnText.length; i++) {
            purpleTurnText[i].style.color = "lightGrey";
            whiteTurnText[i].style.color = "black";
        }
    } else {
        turn = true;
        for (let i = 0; i < whiteTurnText.length; i++) {
            purpleTurnText[i].style.color = "purple";
            whiteTurnText[i].style.color = "lightGrey";
        }
    }
    givePiecesEventListeners();
}
givePiecesEventListeners();