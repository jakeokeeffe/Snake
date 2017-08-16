window.onload = function(){

var snake = document.getElementById("snake");
    snake.style.marginLeft = Math.floor(Math.random()*950)+1 + "px";
    snake.style.marginTop = Math.floor(Math.random()*470)+1 + "px";
var snakeStyle = getComputedStyle(snake);
var btn = document.getElementById("button");
var area = document.getElementById("area");
var h1 = document.querySelector("h1");
var select = document.querySelector("select")
var startScreen = document.getElementById("start-screen")
var timerId;
var score = document.getElementById("score");
var topScore = document.getElementById("top-score")
    topScore.textContent = localStorage.getItem("topScore");
var bodies = [];


btn.addEventListener("click", function(){
    startScreen.style.display = "none";
    startGame();
})


function startGame(){
createFood();

document.onkeydown = function(e){
    if(e.keyCode === 38){
clearTimeout(timerId);
timerId = setInterval(function(){
    bodyPosition();
    minusValue("margin-top", getCurrent(snake, "margin-top"));
    var food = document.getElementById("food")
    collisionFood(snake, food);
    collisionBody();
},100);
    }

    if(e.keyCode === 40){
clearTimeout(timerId);
timerId = setInterval(function(){
        bodyPosition();
    addValue("margin-top", getCurrent(snake, "margin-top"));
    var food = document.getElementById("food")
    collisionFood(snake, food);
    collisionBody();
},100);
    }
    if(e.keyCode === 37){
clearTimeout(timerId);
timerId = setInterval(function(){
        bodyPosition();
    minusValue("margin-left", getCurrent(snake, "margin-left"));
    var food = document.getElementById("food")
    collisionFood(snake, food);
    collisionBody();
},100);
    }
    if(e.keyCode === 39){
clearTimeout(timerId);
timerId = setInterval(function(){
        bodyPosition();
    addValue("margin-left", getCurrent(snake, "margin-left"));
    var food = document.getElementById("food")
    collisionFood(snake, food);
    collisionBody();
},100);
    }
}
}










function getCurrent(obj, dir){
    style = getComputedStyle(obj);
     current = style[dir];
    current = current.slice(0,-2);
    next = current;
    return Number(next);
}
function addValue(dir, num){
    var newMargin = num + 30 + "px";
    var difficulty = select.options[select.selectedIndex].value;
    snake.style[dir] = String(newMargin);
if (difficulty === "easy"){
   if(snake.style["margin-left"].slice(0,-2) > 950){
        snake.style["margin-left"] = 1 + "px";
    }
    if(snake.style["margin-top"].slice(0,-2)>479){
        snake.style["margin-top"] = 1 + "px";
    }
}
if (difficulty ==="medium" || difficulty === "hard"){
    if(snake.style["margin-left"].slice(0,-2) > 950){
        gameOver();
    }
    if(snake.style["margin-top"].slice(0,-2)>479){
        gameOver();
    }
}

}
function minusValue(dir, num){
    var newMargin = num - 30 + "px";
    snake.style[dir] = String(newMargin);
    var difficulty = select.options[select.selectedIndex].value;
    if (difficulty === "easy"){
       if(snake.style["margin-left"].slice(0,-2)<0){
        snake.style["margin-left"] = 949 + "px";
    }
    if(snake.style["margin-top"].slice(0,-2)<0){
        snake.style["margin-top"] = 478 + "px";
    }
}


if (difficulty ==="medium" || difficulty === "hard"){
    if(snake.style["margin-left"].slice(0,-2)<0){
         gameOver();
    }
    if(snake.style["margin-top"].slice(0,-2)<0){
         gameOver();
    }
}
}

function createFood(){
    var food = document.createElement("div");
    food.setAttribute("id", "food");
    randomPosition(food);
    area.appendChild(food);
}
function randomPosition(obj){
  obj.style.marginLeft = generateRandomWidth();
  obj.style.marginTop = generateRandomHeight();
}
function generateRandomWidth(){
    var num = Math.floor(Math.random()*950)+1
    var px = num + "px";
    return px;
}
function generateRandomHeight(){
    var num = Math.floor(Math.random()*470)+1
    var px = num + "px";
    return px;
}
function collisionFood(colider, colidee){
    var coliderLeft = getCurrent(colider, "margin-left");
    var coliderTop = getCurrent(colider, "margin-top");
    var colideeLeft = getCurrent(colidee, "margin-left");
    var colideeTop = getCurrent(colidee, "margin-top");
if(colideeLeft-30<coliderLeft && coliderLeft<colideeLeft+30 && colideeTop-30<coliderTop && coliderTop<colideeTop+30){
  colidee.parentNode.removeChild(colidee);
  createFood();
  addBody();
    }
}
function addBody(){
    var body = document.createElement("div");
    body.classList.add("body");
    if (bodies.length < 1){
    body.style["margin-left"] = getCurrent(snake, "margin-left")-(30*(bodies.length+1)) + "px";
    body.style["margin-top"] = getCurrent(snake, "margin-top")-(30*(bodies.length+1)) + "px";
}
else{
    body.style["margin-left"] = getCurrent(bodies[bodies.length-1], "margin-left") + "px";
    body.style["margin-top"] = getCurrent(bodies[bodies.length-1], "margin-top")+ "px";
}
    area.appendChild(body);
    bodies.push(body);
    score.textContent = bodies.length;
}
function bodyPosition(){
    var marginLeft = getCurrent(snake,"margin-left");
    var marginTop = getCurrent(snake,"margin-top");
if(bodies.length >0){
    for (var i = bodies.length-1; i>0; i--){
        bodies[i].style.marginLeft = getCurrent(bodies[i-1], "margin-left") + "px";
        bodies[i].style.marginTop = getCurrent(bodies[i-1], "margin-top") + "px";
    }
    bodies[0].style.marginLeft = marginLeft + "px";
    bodies[0].style.marginTop = marginTop + "px";
}
}

function collisionBody(){
    var snakeLeft = getCurrent(snake, "margin-left");
    var snakeTop = getCurrent(snake, "margin-top");
    for (var i=0; i<bodies.length; i++){
        if(snakeLeft == getCurrent(bodies[i], "margin-left") && snakeTop == getCurrent(bodies[i], "margin-top")){
            gameOver();
        }
    }
};

function gameOver(){
    startScreen.style.display = "inline";
    btn.style.display = "none";
    var diff = document.getElementById("choose-difficulty");
    diff.style.display = "none";
    h1.textContent = "YOU LOSE!!!!"
    h1.style.color = "red";
    h1.style.top = "50%";
    h1.style.zIndex = "100"
    h1.style.backgroundColor = "black";
    if(localStorage.getItem("topScore")<bodies.length){
    localStorage.setItem("topScore", bodies.length)
}
    setTimeout(function() {
        location.reload();
    }, 3000);
}


}////END////
