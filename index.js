
//gameboard module
const Gameboard = (() => {
    let gameboard = ["", "" , "", "", "", "", "", "", ""]; //creating a gameboard as an Array

    const render = () => {    //rendering our gamboard
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`

        })
        document.querySelector("#gameboard").innerHTML = boardHTML;

        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {                            //adding click options to our square divs
            square.addEventListener("click", Game.handleClick);

        })

        }

    const update = (index, value) => {
        gameboard[index] = value;
        render();


    }

    const getGameboard = () => gameboard;

    return {
        render,
        update,
        getGameboard
    }

})();

const createPlayer = (name, mark) => {  //creating players
    return {
        name,
        mark
    }
}

// game logic
const Game = (() => {
    let players = [];
    let currentPlayerIndex; //will help up determine which player is on the move
    let gameOver; //will help us determine when the game is over

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
        
    }

    const handleClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);
        
        if (Gameboard.getGameboard() [index] !=="") {
            return
        }

        Gameboard.update(index, players[currentPlayerIndex].mark);

        if(checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            alert(`${players[currentPlayerIndex].name} won the game !`);
        }
        else if (checkForTie(Gameboard.getGameboard())) {
            gameOver = true;
            alert("it's a tie !");
        }
        

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const checkForWin = (board) => { //all the winning combinations from our gameboard array
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        for (let i = 0;i < winningCombinations.length; i++) { //winning logic
            const [a,b,c] = winningCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    } 

    const checkForTie = (board) => {
        return board.every(cell => cell !== "");

    }

    const restart = () => { //loops through our gameboard and empties our fields
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, "");
        }
        Gameboard.render();
    }

    return {
        start,
        handleClick,
        restart
    }

    

})();

//button for restarting our game
const restartButton = document.querySelector("#restart-btn");
restartButton.addEventListener("click", ()=> {
    Game.restart();
})
// button for starting
const startButton = document.querySelector("#start-btn");
startButton.addEventListener("click", () => {
    console.log("hi");
    Game.start();
})