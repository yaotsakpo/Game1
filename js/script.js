
let map  = document.getElementById('map');
let columns = 15;   //Colones
let rows = 25;  //Lignes


let safeILocation = [];
let safeJLocation = [];

let valeur_score = 0;
let life = 40;
let initialBarLength = 600;

let visitedLocation = [];
let tresorFound = [];
let trapFound = [];

let playerPosition = [13,8];


for (let i = 1; i <= rows; i++) {
    let randomJ = Math.floor(Math.random() * 25);
    safeJLocation.push(randomJ);
}

for (let i = 1; i <= columns; i++) {
    let randomI = Math.floor(Math.random() * 15);
    safeILocation.push(randomI);
}


// get unique values
safeILocation = safeILocation.filter(function (x, i, a) { 
    return a.indexOf(x) === i; 
});

safeJLocation = safeJLocation.filter(function (x, i, a) { 
    return a.indexOf(x) === i; 
});

initializeMap();



function initializeMap(){
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= columns; j++){
            if(i == playerPosition[0] && j == playerPosition[1] ){
                map.innerHTML += '<img src="img/Player.png" onclick="test('+i+","+j+')" alt="player" id="pion_'+i+"_"+j+'">';
            }else{
                map.innerHTML += '<img src="img/initial.png" onclick="test('+i+","+j+')" alt="jeton" id="pion_'+i+"_"+j+'"style="visibility: hidden;">';
            }
        }
        map.innerHTML += "<br>"
    }
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}





// for testing purpose
function test(i,j){
   let clicked = document.getElementById("pion_"+i+"_"+j);
}

function movePlayer(button){

    let x = playerPosition[0];
    let y = playerPosition[1];

    let foundTresor = JSON.stringify(tresorFound).includes('['+x+','+y+']');

    let foundTrap = JSON.stringify(trapFound).includes('['+x+','+y+']');

    if(x >= 1 &&  x <= 25 && y>= 1 &&  y <= 15 ){
        
        let oldPosition = document.getElementById("pion_"+x+"_"+y);
        oldPosition.src = foundTresor ? "img/Jeton.png" : (foundTrap ? "img/trap.png" : "img/visited_position.png");
        // oldPosition.style.visibility = foundTresor || foundTrap ? "visible" : "hidden";
        oldPosition.style.visibility ="visible";



        // add if not exisitng in visited array
        if(!JSON.stringify(visitedLocation).includes('['+x+','+y+']')){
            visitedLocation.push([x,y]);
        }


        switch(button) {
            case 'up':
                if(playerPosition[0] > 1){
                    playerPosition[0]--;
                }
            break;
            case 'down':
                if(playerPosition[0] < 25){
                    playerPosition[0]++;
                }
            break;
            case 'left':
                if(playerPosition[1] > 1){
                    playerPosition[1]--;
                }
                break;
            case 'right':
                if(playerPosition[1] < 15){
                    playerPosition[1]++;
                }
                break;
        }

        let random_check = Math.floor(Math.random() * 10);

        if(random_check % 2 == 0 && !safeILocation.includes(playerPosition[0]) && 
            !safeJLocation.includes(playerPosition[1]) && 
            !JSON.stringify(visitedLocation).includes('['+playerPosition[0]+','+playerPosition[1]+']')){

                let i = playerPosition[0];
                let j = playerPosition[1];

                let random_check2 = Math.floor(Math.random() * i+j);

                if( random_check2 % 2 == 0 ){
                    valeur_score += 1000;
                    tresorFound.push([i,j]);
                }else{
                    valeur_score -= 50;
                    life--;
                    document.getElementById("life").innerHTML = ""+life;
                    initialBarLength -= 20;
                    document.getElementById("myBar").style.width = initialBarLength+"px";
                    trapFound.push([i,j]);
                }

        }else if(!JSON.stringify(visitedLocation).includes('['+playerPosition[0]+','+playerPosition[1]+']')){
            valeur_score -= 10;
        }

        document.getElementById("valeur_score").innerHTML = ""+valeur_score;


        let position = document.getElementById("pion_"+playerPosition[0]+"_"+playerPosition[1]);
        position.src = "img/Player.png";
        position.style.visibility = "visible";

        if(life == 0 && visitedLocation.length < 375){
            document.getElementById("result").innerHTML = " <h2> Game over </h2> <p>Score: "+ valeur_score +"</p> <p> Vous avez perdu !</p>";
            modal.style.display = "block";
        }else if(visitedLocation.length >= 375 && life > 0){
            document.getElementById("result").innerHTML = " <h2> Vous avez gagné  </h2> <p>Score: "+ valeur_score +"</p> <p> Vous avez visité toutes les positions. Félicitations !</p>";
            modal.style.display = "block";
        }

    }

}

function reset(){
    location.reload();
}

