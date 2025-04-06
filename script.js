//varijabla playerCurrentScore
//varijabla playerTotalScore
//Funkcija playerScoreCreator
//Funkcija scoreManager
//Funkcija Roll dice
//Funkcija hold


//Dodati da se igra do score 10
//Dodati da igraju 4 playera
//Prikazati win ili lose
//Prikazati aktivnog igraca na ekranu

import { dices } from "./DiceArray.js";
const newGame = document.querySelector('.new-game');
const roll = document.querySelector('.roll-dice');
const hold = document.querySelector('.hold');
const randomDice = document.querySelector('.all-btns img');

const playerOneScore = document.querySelector(".total-scoreOne");
const playerTwoScore = document.querySelector(".total-scoreTwo");
const playerThreeScore = document.querySelector(".total-scoreThree");
const playerFourScore = document.querySelector(".total-scoreFour");

const playerOneCurrent = document.querySelector(".player-one .currentScore h2"); 
const playerTwoCurrent = document.querySelector(".player-two .currentScore h2");
const playerThreeCurrent = document.querySelector(".player-three .currentScore h2");
const playerFourCurrent = document.querySelector(".player-four .currentScore h2");

function playerScoreCreator() {
    let serialNumber = 0;
    let playerCurrentScore = 0;
    let playerTotalScore = 0;
    let active = false; 

    const getCurrentScore = () => playerCurrentScore;
    const setCurrentScore = (value) => { playerCurrentScore = value; };
    const addToCurrentScore = (value) => { playerCurrentScore += value; };

    const getTotalScore = () => playerTotalScore;
    const addToTotalScore = (value) => { playerTotalScore += value; };
    const resetTotalScore = () => { playerTotalScore = 0; };

    const isActive = () => active;
    const toggleActive = (value) => { active = value };
    const givePlayerSerialNumber = (value) => { serialNumber = value };
    const playerSerialNumber = () => { return serialNumber };

    return { getCurrentScore, setCurrentScore, addToCurrentScore, getTotalScore, addToTotalScore, resetTotalScore, isActive, toggleActive, playerSerialNumber, givePlayerSerialNumber };
}

function scoreManager() {
    let orderedPlayer = 0;

    const playerScoresArray = [];

    const pushScoreInArray = (player) => playerScoresArray.push(player);

    const giveRandomId = () => Math.floor(Math.random() * 6) + 1; 

    const giveRandomDice = (id) => dices.find(dice => dice.id === id).img;

    const checkActivePlayer = () => playerScoresArray.find(player => player.playerSerialNumber() == orderedPlayer);
    
    const addValueToCurrentScore = (id) => {
        const selectedPlayer = checkActivePlayer();
        selectedPlayer.addToCurrentScore(id);
        winner();
    };

    const resetOnDiceStatusOne = (randomId) => {
       if(randomId === 1){
            const selectedPlayer = checkActivePlayer();
            selectedPlayer.setCurrentScore(0);
            setPlayerByOrder();
       }
    };
    const setPlayerByOrder = () => {
        orderedPlayer = (orderedPlayer + 1) % playerScoresArray.length;
        return orderedPlayer;
    }
    const winner = () => {
        const selectedPlayer = checkActivePlayer();
        if(selectedPlayer.getTotalScore() > 20 || selectedPlayer.getCurrentScore() > 20){
            resetGame();
        }
    }
    const resetGame = () => {
        playerScoresArray.forEach(player => {
            player.resetTotalScore();
            player.setCurrentScore(0);
        });
        orderedPlayer = 0;
        updateUI();
    };

    const returnArray = () => { return playerScoresArray };

    return { winner, setPlayerByOrder, giveRandomId, giveRandomDice, pushScoreInArray, checkActivePlayer, addValueToCurrentScore, resetGame, returnArray, resetOnDiceStatusOne };
}

const manager = scoreManager();
randomDice.style.display = 'none';

for (let i = 0; i < 4; i++) {
    const player = playerScoreCreator();
    player.givePlayerSerialNumber(i);
    manager.pushScoreInArray(player);
}

function displayRandomDice() {
    const diceId = manager.giveRandomId();
    randomDice.style.display = 'block';
    randomDice.src = manager.giveRandomDice(diceId);
    manager.addValueToCurrentScore(diceId);
    manager.resetOnDiceStatusOne(diceId);
    updateUI();
}

function updateUI() {
    const playerOne = manager.returnArray()[0];
    const playerTwo = manager.returnArray()[1];
    const playerThree = manager.returnArray()[2];
    const playerFour = manager.returnArray()[3];
    
    playerOneScore.textContent = playerOne.getTotalScore();
    playerTwoScore.textContent = playerTwo.getTotalScore();
    playerThreeScore.textContent = playerThree.getTotalScore();
    playerFourScore.textContent = playerFour.getTotalScore();

    playerOneCurrent.textContent = playerOne.getCurrentScore();
    playerTwoCurrent.textContent = playerTwo.getCurrentScore();
    playerThreeCurrent.textContent = playerThree.getCurrentScore();
    playerFourCurrent.textContent = playerFour.getCurrentScore();
}

roll.addEventListener('click', () => {
    displayRandomDice();
});

hold.addEventListener('click', () => {
    const currentPlayer = manager.checkActivePlayer();
    currentPlayer.addToTotalScore(currentPlayer.getCurrentScore());
    currentPlayer.setCurrentScore(0);
    manager.winner();
    updateUI();
});

newGame.addEventListener('click', () => {
    manager.resetGame();
    randomDice.style.display = 'none';
});
