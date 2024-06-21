//Variables declaration and initialization
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var wonGame = false;
var started = false;

//Start game on button click
$(".start-button").click(function(){
    started = true;
    $("h1").text("level " + level);
    $("p").text("");
    $(".start-button").hide();
    nextSequence();
});

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress($(this));
    for(var i = 0; i < userClickedPattern.length; i++){
        if(checkAnswer(i)){
            continue;
        };
    }
    if(gamePattern.length === userClickedPattern.length){
        setTimeout(() => {
            nextSequence();
        }, 500);
    }
});

//comparing the complete game and user clicked sequences to see if the user looses or gets to the next level
function checkAnswer(index){
    if (gamePattern[index] === userClickedPattern[index]){
        return true;
    }
    else{
        wonGame = false;
        playSound("wrong");
        $("h1").text("Game Over");
        $("p").text("Press START to start over")
        $(".start-button").show();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
        return false;
    }
}

function nextSequence(){
    started = false;
    clicks = 0;
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

//Resetting the start game variables
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}