var food=new Audio('./music/food.mp3');
var move=new Audio('./music/move.mp3');
var over=new Audio('./music/gameover.mp3');
var highscore_sound=new Audio('./music/win sound.mp3');
var snake_game=document.getElementById("snake_game")
var speed=8;
var lastTime=0;
var score=0,highscore=0;
var snakePosition=[{x:20,y:12}];
var foodPosition={x:10,y:10};
var Direction={x:0,y:0};
var gameOver=0;
var updownCompulsion=1,leftrightCompulsion=1;

// displying highscore on window load.
window.onload=function(){
    $.ajax({
        method: "POST",
        url: "ind.php",
        data: { highscores:""}
      })
        .done(function( response ) {
            highscore=response;
            document.getElementById("highscore").innerHTML="High Score:"+highscore;
        });
}

// function that will run continuously
function gameSpeed(currentTime){
    window.requestAnimationFrame(gameSpeed);
    if((currentTime - lastTime)/1000 < 1/speed){
        return;
    }
    // speed division by 1000 because time shows by requestAnimationFrame is in milliseconds.
    if(gameOver==0){
        mainGame(); 
    }
    else{
        Movesnake();
        highscoreBreak();
    }
    lastTime=currentTime;
}
window.requestAnimationFrame(gameSpeed);

// main logic
function mainGame(){
        //movement of snake
        Movesnake();
        snake_game.innerHTML="";
        //displaying snake
        //for the tail of the snake, value will return the each object of the array snakePosition
        snakePosition.forEach((value,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=value.y;
        snakeElement.style.gridColumnStart=value.x;;
        if(index==0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("tail");
        }
        snake_game.appendChild(snakeElement);
    });

    //displaying the food
    snakeFood=document.createElement('div');
    snakeFood.style.gridRowStart=foodPosition.y;
    snakeFood.style.gridColumnStart=foodPosition.x;
    snakeFood.classList.add("food");
    snake_game.appendChild(snakeFood);
    
    //game over events
    Collision(snakePosition);
    
    // if snake ate the food
    if(foodPosition.x==snakePosition[0].x && foodPosition.y==snakePosition[0].y){
        food.play();
        snakePosition.push({x:snakePosition[snakePosition.length-1]+Direction.x,y:snakePosition[snakePosition.length-1]+Direction.y})
        foodPosition.x=Math.floor(Math.random()*(30))+1;
        foodPosition.y=Math.floor(Math.random()*(30))+1;
        score++;
        if(score%5==0){
            speed+=2.5;
        }
        document.getElementById("score").innerHTML="Score:"+score;
        if(score>highscore){
            document.getElementById("highscore").innerHTML="High Score:"+score;
        }
    }   
}

//key press events for pc/laptops
window.addEventListener("keyup",(e)=>{
    move.play();
    if(e.keyCode==38 || e.keyCode==87){     //&& updownCompulsion<=1   (not given here because otherwise logic won't work of phones)
        Upperkey();
        
    }
    else if(e.keyCode==40 || e.keyCode==83){
        Lowerkey();
    }
    else if(e.keyCode==37 || e.keyCode==65){
        Leftkey();
    }
    else if(e.keyCode==39 || e.keyCode==68){
        Rightkey();
    }
   
});

//upperkey function
function Upperkey(){
    if(updownCompulsion<=1){
        Direction.x=0;
        Direction.y=-1;
        updownCompulsion=0;
        leftrightCompulsion=1;
    }
}

//Lowerkey function
function Lowerkey(){
    if(updownCompulsion>=1){
        Direction.x=0;
        Direction.y=1;
        updownCompulsion=2;
        leftrightCompulsion=1;
    }
}

//Leftkey function
function Leftkey(){
    if(leftrightCompulsion<=1){
        Direction.x=-1;
        Direction.y=0;
        updownCompulsion=1;
        leftrightCompulsion=0;
    }
}
//Rightkey function
function Rightkey(){
    if(leftrightCompulsion>=1)
    {
        Direction.x=1;
        Direction.y=0;
        updownCompulsion=1;
        leftrightCompulsion=2;
    }
}

// Movements of snake
function Movesnake(){
        for(var i=snakePosition.length-2;i>=0;i--){
            snakePosition[i+1]={...snakePosition[i]};
        }
        snakePosition[0].x+=Direction.x;
        snakePosition[0].y+=Direction.y;
}

// Game over function
function Collision(arr){
    // if snake collide by itself
    for(var j=1;j<snakePosition.length;j++){
        if(snakePosition[0].x==snakePosition[j].x && snakePosition[0].y==snakePosition[j].y){
            stopGame();
            break;
        }
    }
        if((snakePosition[0].x > 30 || snakePosition[0].x < 1) || (snakePosition[0].y > 30 || snakePosition[0].y<1) ){
            stopGame();
        }
}
function stopGame(){
    over.play();
    gameOver=1;
    Direction={x:0,y:0};
    alert("Game Over!");
    speed=13;
    if(score>highscore){
        snakePosition=[{x:6,y:1},{x:5,y:1},{x:4,y:1},{x:3,y:1},{x:2,y:1},{x:1,y:1}];
        document.getElementById("main_game").style.display="none";
        document.getElementById("highscore_breaker").style.display="grid";
        highscore_sound.play();
        highscoreBreak();
        $.ajax({
                method: "POST",
                url: "ind.php",
                data: {highscore:score}
            })
                .done(function( response ) {
                });
    }
    buttons.removeEventListener('click');
    window.removeEventListener("keyup");
}

// phones buttons
var buttons=document.querySelectorAll("button");
buttons[0].addEventListener('click',Upperkey);
buttons[1].addEventListener('click',Leftkey);
buttons[2].addEventListener('click',Lowerkey);
buttons[3].addEventListener('click',Rightkey);

// highscorer breaker events
var run=7;
var pos=0;
function highscoreBreak(){
        document.getElementById("highscore_breaker").innerHTML="";
        h1=document.createElement("h1");
        h1.innerHTML="You set a new highscore.";
        snakePosition.forEach((value,index) => {
        snakeDiv=document.createElement('div');
        snakeDiv.style.gridRowStart=value.y;
        snakeDiv.style.gridColumnStart=value.x;
        if(index==0){
            snakeDiv.classList.add("head");
        }
        else{
            snakeDiv.classList.add("tail");
        }
        document.getElementById("highscore_breaker").appendChild(snakeDiv);
        document.getElementById("highscore_breaker").appendChild(h1);
    });
    if(pos==0){              //top or moving in right
        Direction={x:1,y:0};
    }
    else if(pos==1){         //right or moving downwards
        Direction={x:0,y:1};
    }
    else if(pos==2){        //bottom or movie towards left
        Direction={x:-1,y:0};
    }
    else if(pos==3){        //left moving up
        Direction={x:0,y:-1};
    }
    if(run==20){
        run=1;
        pos++;
        if(pos>3){
            pos=0;
        }
    }
    run++;
}
