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

    const pushScoreInArray = () => {
        playerScoreCreator.push();
    }
    const giveRandomDice = () => {
       let find = Math.floor(Math.random() * 6);
       return dices.find(dice => dice.id == find);
    }

    return { giveRandomDice, pushScoreInArray }
}
const manager = scoreManager();

roll.addEventListener('click', () => {
    console.log('radi')
});
console.log(manager.giveRandomDice())