// creating a new patern
gamePattern=[];
userClickedPattern=[];
var buttonColours =["red","blue","green","yellow"];
level=0;
started=false;
//start the game
$(document).keydown(function(){

  if (started !=true){
    setTimeout(function () {
      nextSequence();
    }, 1500);
    started=true;
    console.log("1");
    $("h1").text("Ready");

  }
});

//clciking button effects
$(".btn").click(function(event){
  //console.log(event.target.id);
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

function nextSequence(){
  level++;
  console.log("2");
  $("#level-title").text("Level "+level);
  // creating a new patern
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Show the Sequence to the User with Animations and Sounds
  $("#"+randomChosenColour).fadeTo(100,0.5).fadeTo(100,1);
  playSound(randomChosenColour);
  //animatePress(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);

}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1]){
    console.log("suc");
  }else{
    console.log(userClickedPattern);
    console.log(gamePattern);
    console.log(userClickedPattern[currentLevel]);
    console.log(gamePattern[currentLevel]);
    console.log("currentLevel "+currentLevel);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Your  score is "+level +" Press Any Key to Restart");
    startOver();
  }

  if (currentLevel===level){
    console.log("yuup");
    setTimeout(function(){
      nextSequence();},1000);
      userClickedPattern=[];
    }
}

function startOver(){
  level=0;
  userClickedPattern=[];
  gamePattern=[];
  started=false;
}
