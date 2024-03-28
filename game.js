
//Variables declaration and initialization
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var wonGame = false;
var started = false;

//Start game on key press
$(document).keydown(() =>{
    started = true;
    $("h1").text("level " + level);
    nextSequence();
})

$("div .btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress($(this));

    checkAnswer(userClickedPattern.length);
});

function nextSequence(){
    started = false;
    //Initialize an empty array to save the user clicked color sequence 
    userClickedPattern = [];

    //Populating random game sequence and playing animations and sounds
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    var chosenButton = $("#" + randomChosenColour);
    chosenButton.fadeOut(100).fadeIn('slow') ;

    $("h1").text("level " + level);
    level++;
}

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    return sound.play();
}

function animatePress(currentColour){
    currentColour.addClass("pressed");
    setTimeout(() => {
        currentColour.removeClass("pressed");
    }, 100);
}

//comparing the game and user clicked sequences to see if the user looses or gets to the next level
function checkAnswer(currentLevel){
    if (currentLevel === gamePattern.length){
        for(var i = 0; i < gamePattern.length; i++){
            if (gamePattern[i] === userClickedPattern[i]){
                wonGame = true;
            }
            else{
                wonGame = false;
                playSound("wrong");
                $("h1").text("Game Over, Press Any Key to Restart");
                $("body").addClass("game-over");
                setTimeout(() => {
                    $("body").removeClass("game-over");
                }, 200);
                startOver();
            }
        }
        if(wonGame === true){
            setTimeout(() => {
                nextSequence();
            }, 500);
        }
    }   
}

//Resetting the start game variables
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}