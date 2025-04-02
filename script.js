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

function playerScoreCreator() {
    let playerCurrentScore;
    let playerTotalScore;

    const getCurrentSocre = () => {
        return playerCurrentScore;
    }   
    const getTotalScore = () => {
        return playerTotalScore;
    }
    return { getCurrentSocre, getTotalScore }
}
function scoreManager(){
    const playerScoresArray  = [];

    const pushScoreInArray = (player) => {
        playerScoresArray.push(player);
    }
    const giveRandomDice = () => {
       let find = Math.floor(Math.random() * 6);
       return dices.find(dice => dice.id === find).img;
    }
    const returnArray = () => {
        return playerScoresArray;
    }
    return { giveRandomDice, pushScoreInArray, returnArray }
}
const manager = scoreManager();


for(let i = 0; i < 2; i++){
    const playerCreator = playerScoreCreator();
    manager.pushScoreInArray(playerCreator);
}

function displayRandomDice(){
   randomDice.src = `${manager.giveRandomDice()}`;
}

roll.addEventListener('click', () => {
    displayRandomDice();
});