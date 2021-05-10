"use strict";

const gameContainer = document.querySelector(".ticBox"); //selects game container element
const gameBox = document.querySelectorAll(".tacBox"); //selects all boxes in game container

var turn = true;

const gameTabs1 = [];
const gameTabs2 = [];

const winningCombos =  [
    [0, 1, 2], 
    [0, 3, 6], 
    [0, 4, 8], 
    [1, 4, 7], 
    [2, 4, 6], 
    [3, 4, 5],
    [6, 7, 8],
    [2, 5, 8]
];

const playerTabs = {
    player1: 0,
    player2: 0
}

var p1Score = 0;
var p2Score = 0;
var click = 0;
var plays = 0;

gameContainer.addEventListener("click", function (e){
    if (plays === 10) return;
    plays++;
    console.log(`before plays: ${plays}`);
    const selected = e.target.closest(".tacBox"); //selects the element that was clicked witht the class of tacBox
    if(!selected) return; //if any other element was clicked without the class tacBox then exit function
    if (selected.classList.contains("played")) return;//exits function if box has been clicked already

    // console.log(selected);
    console.log(turn);

    var index = selected.getAttribute("class").split("-").pop();//position of played shape
    index--;
    if(!selected.classList.contains("played") && turn == true){//if element that has not yet been played and is player 1
        selected.querySelector(".gameItem").setAttribute("src", "./src/img/X.png");
        selected.classList.add("played");
        selected.querySelector(".gameItem").classList.remove("Invisible");
    }

    if(!selected.classList.contains("played") && turn == false){
        selected.querySelector(".gameItem").setAttribute("src", "./src/img/O.png");
        selected.classList.add("played");
        selected.querySelector(".gameItem").classList.remove("Invisible");
    }
    
    console.log(`index: ${index}`);

    testWin(index);//test to see if win
    
    turn = !turn;//change turn
    if(plays === 9) {
        const winBT = document.querySelector(".winBoxText");
        const winB = document.querySelector(".winBox");
        winBT.innerHTML = "IT'S A DRAW!";
        winB.classList.remove("Invisible");
    }
    console.log(`after plays: ${plays}`);
});

function testWin(index) {
    var playerCheck;
    if (turn == false) {//place index in player tabs
        gameTabs2.push(index);
        playerCheck = 2;
    }

    if(turn == true) {
        gameTabs1.push(index);
        playerCheck = 1;
    }

    // console.log(`gametabs1: ${gameTabs1}`);
    // console.log(`gametabs2: ${gameTabs2}`);
    if (gameTabs1.length >= 3 || gameTabs2.length >= 3) {
        
        
            // console.log(`gameTabs Length: ${gameTabs1.length}`);
        for(let y = 0; y < winningCombos.length; y++ ){
            // console.log(`winning Combos Length: ${winningCombos.length}`);
            p1Score = 0;
            p2Score = 0;
            for (let z = 0; z < winningCombos[y].length; z++) {
                for(let x = 0; x < gameTabs1.length; x++) {
                    // console.log(`tab1: ${gameTabs1[x]} & combo: ${winningCombos[y][z]}`);
                    if(gameTabs1[x] === winningCombos[y][z] && playerCheck === 1) p1Score++;
                    // console.log(`tab2: ${gameTabs2[x]} & combo: ${winningCombos[y][z]}`);
                    if(gameTabs2[x] === winningCombos[y][z] && playerCheck === 2) p2Score++;
                    if(p1Score === 3 || p2Score === 3) {
                        plays = 10;
                        winFunc(playerCheck);
                        return;
                    }
                    // console.log(`x: ${x}, y: ${y}, z: ${z}`);
                    // console.log(`tabs:\t${gameTabs1[x]}\ttabs2: ${gameTabs2[x]}\twinningCombos: ${winningCombos[y][z]}`);
                    
                }
        
            }

        }
    }
    

    
 
}

function winFunc(player) {
    const winBT = document.querySelector(".winBoxText");
    const winB = document.querySelector(".winBox");
    winBT.innerHTML = `PLAYER ${player} WINS!!`
    winB.classList.remove("Invisible");
    console.log(`player ${player} wins!`);
    // console.log(`plays: ${plays}`);
}

function reloadFunc(){
    location.reload();
}