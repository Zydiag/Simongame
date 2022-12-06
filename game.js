var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var userClickedPattern = [];

var gamePattern = [];

var index = 0;

function animatePress(currentColour) {
    $("#" + currentColour).fadeOut(100).fadeIn(100);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.autoplay = "true";
    audio.play();
}

function nextSequence() {
    
    level++;
    randomChosenColour = buttonColours[ Math.floor(Math.random() * 4) ];
    gamePattern.push(randomChosenColour);
    console.log(randomChosenColour);
    // animatePress(randomChosenColour);
    setTimeout(
        function(){
            $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
            playSound(randomChosenColour);
        },1000)
    
    $("h1").text("level " + level);
}



$(document).one("keypress", function (e) {
    nextSequence();

});

// $(document).keypress(function (e) { 
//     nextSequence();
// });sss


$(".btn").click(function (e) {
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(index);
    $("#" + userChosenColour).addClass("pressed");
    setInterval(function(){
        $("#" + userChosenColour).removeClass("pressed");
    },100)
    // index++;
    console.log(gamePattern,userClickedPattern)

});


function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    index = 0;
    $(document).one("keypress", function (e) {
        nextSequence();
    
    });
    // nextSequence();
}

function checkAnswer(currentLevel) {
    console.log(gamePattern,userClickedPattern)

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        index++;
        console.log("sucess")
        if(index === level)
        {   
            index=0;
            console.log("complete");
            nextSequence();
        userClickedPattern = [];

            
        }
        

    }
    else{
        console.log("fail");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(
            function() {
                $("body").removeClass("game-over");
            }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        
    }
    
}