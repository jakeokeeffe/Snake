window.onload = function(){

var snake = document.getElementById("snake");
var snakeStyle = getComputedStyle(snake);
var btn = document.getElementById("button");
var area = document.getElementById("area");
var h1 = document.querySelector("h1");
/*var snakeTop = snakeStyle.top;
var snakeLeft = snakeStyle.left;
var snakeRight = snakeStyle.right;
var snakeBottom = snakeStyle.bottom;
*/




document.onkeydown = function(e){
    if(e.keyCode === 38){
    minusValue("margin-top", getCurrent(snake, "margin-top"));
    var food = document.getElementById("food")
    collisionFood(snake, food)
    }
    if(e.keyCode === 40){
    addValue("margin-top", getCurrent(snake, "margin-top"));
    var food = document.getElementById("food")
    collisionFood(snake, food)
    }
    if(e.keyCode === 37){
    minusValue("margin-left", getCurrent(snake, "margin-left"));
    var food = document.getElementById("food")
    collisionFood(snake, food)
    }
    if(e.keyCode === 39){
    addValue("margin-left", getCurrent(snake, "margin-left"));
    var food = document.getElementById("food")
    collisionFood(snake, food)
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
    snake.style[dir] = String(newMargin);
    console.log(newMargin);
}
function minusValue(dir, num){
    var newMargin = num - 30 + "px";
    snake.style[dir] = String(newMargin);
    console.log(newMargin);
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
    var num = Math.floor(Math.random()*1000)+1
    var px = num + "px";
    return px;
}
function generateRandomHeight(){
    var num = Math.floor(Math.random()*490)+1
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
}
}


createFood();

var timerId = setInterval(function(){
    //addValue("top", getCurrent("top"));
    //addValue("top", getCurrent("top"));
},1000);






};

