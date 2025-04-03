//varijabla playerCurrentScore
//varijabla playerTotalScore
//Funkcija playerScoreCreator
//Funkcija scoreManager
//Funkcija Roll dice
//Funkcija hold
import { dices } from "./DiceArray.js";
const newGame = document.querySelector('.new-game');
const roll = document.querySelector('.roll-dice');
const hold = document.querySelector('.hold');
const randomDice = document.querySelector('.all-btns img');

const playerOneScore = document.querySelector(".total-scoreOne");
const playerTwoScore = document.querySelector(".total-scoreTwo"); 
const playerOneCurrent = document.querySelector(".player-one .currentScore h2"); 
const playerTwoCurrent = document.querySelector(".player-two .currentScore h2");

function playerScoreCreator() {
    let playerCurrentScore = 0;
    let playerTotalScore = 0;
    let active = false; 

    const getCurrentScore = () => playerCurrentScore;
    const toggleCurrentScore = (value) => { playerCurrentScore = value; };
    const getTotalScore = () => playerTotalScore;
    const toggleTotalScore = (value) => {
        playerTotalScore += value;
    };
    const isActive = () => active;
    const toggleActive = (value) => { active = value; };

    return { getCurrentScore, toggleCurrentScore, getTotalScore, toggleTotalScore, isActive, toggleActive };
}

function scoreManager() {
    const playerScoresArray = [];

    const pushScoreInArray = (player) => playerScoresArray.push(player);

    const giveRandomId = () => Math.floor(Math.random() * 6) + 1; 

    const giveRandomDice = (id) => dices.find(dice => dice.id === id).img;

    const checkActivePlayer = () => playerScoresArray.find(player => player.isActive());
    
    const addValueToCurrentScore = (id) => {
        const selectedPlayer = checkActivePlayer();
        let getValue = selectedPlayer.getCurrentScore();
        getValue += id;
        selectedPlayer.toggleCurrentScore(getValue);
    };
    const resetOnDiceStatusOne = (randomId) => {
       if(randomId === 1){
            const selectedPlayer = checkActivePlayer();
            selectedPlayer.toggleCurrentScore(0);
            changePlayerState();
       }
    }
    const setInitialState = () => {
        playerScoresArray[0].toggleActive(true); 
    };
    
    const changePlayerState = () => {
        const currentPlayer = checkActivePlayer();
        const nextPlayer = playerScoresArray.find(player => !player.isActive());
        
        currentPlayer.toggleActive(false);
        nextPlayer.toggleActive(true); 
        updateUI();
    };
    
    const resetGame = () => {
        playerScoresArray.forEach(player => {
            player.toggleActive(false);
            player.toggleTotalScore(0);
            updateUI();
        });
        setInitialState(); 
    };
    const returnArray = () => { return playerScoresArray };
    
    return { giveRandomId, giveRandomDice, pushScoreInArray, checkActivePlayer, setInitialState, changePlayerState, addValueToCurrentScore, resetGame, returnArray, resetOnDiceStatusOne };
}

const manager = scoreManager();
randomDice.style.display = 'none';

for (let i = 0; i < 2; i++) {
    const player = playerScoreCreator();
    manager.pushScoreInArray(player);
}
manager.setInitialState(); 

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
    
    playerOneScore.textContent = playerOne.getTotalScore();
    playerTwoScore.textContent = playerTwo.getTotalScore();
    playerOneCurrent.textContent = playerOne.getCurrentScore();
    playerTwoCurrent.textContent = playerTwo.getCurrentScore();
    
    document.querySelector(".player-one").classList.toggle("active", playerOne.isActive());
    document.querySelector(".player-two").classList.toggle("active", playerTwo.isActive());
}

roll.addEventListener('click', () => {
    displayRandomDice();
});

hold.addEventListener('click', () => {
    const currentPlayer = manager.checkActivePlayer();
    currentPlayer.toggleTotalScore(currentPlayer.getCurrentScore());
    currentPlayer.toggleCurrentScore(0);
    manager.changePlayerState(); 
});

newGame.addEventListener('click', () => {
    manager.resetGame();
    randomDice.style.display = 'none';
    playerOneScore.innerHTML = '0';
    playerTwoScore.innerHTML = '0';
});
