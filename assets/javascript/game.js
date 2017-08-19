var characters = ["Link","Yoshi","Sonic","Samus","Mario","Bowser","DK","Kirby","Captain","Fox"];
var usedCharacters=[];
var audioElement_song = $("<audio>");
var audioElement_fx = $("<audio>");
var currPlayer="";
var currOpponent="";

var charObjects = {};

for(var i=0; i<characters.length;i++){
	charObjects[characters[i]]={};//creation of new character objects within charObjects - each will be called a character name in characters array
	charObjects[characters[i]].name=characters[i];//gives name to character object
	charObjects[characters[i]].picture="../images/" + characters[i] + ".jpg"; //sets path for picture of character
	charObjects[characters[i]].backgroundImage="../images/" + characters[i] + " background.jpg";//sets path for background picture for background
	charObjects[characters[i]].victoryPic="../images/" + characters[i] + "_victory.jpg";//sets path for victory picture for character
	charObjects[characters[i]].sound_attack="../sounds/" + characters[i] + "_attack.mp3";//sets path for attack sound for character
	charObjects[characters[i]].sound_greeting="../sounds/" + characters[i] + "_greeting.mp3";//sets path for greeting sound for character
	charObjects[characters[i]].healthPoints_orig=100+10*i;//sets original health for character
	charObjects[characters[i]].healthPoints_curr=100+10*i;//sets current health for character - this will change through gameplay
	charObjects[characters[i]].attackPower_origin=6+6*i;//sets original attack power for character
	charObjects[characters[i]].attackPower_temp=6+6*i;//sets temp attack power for character - this will be changed through gameplay
	charObjects[characters[i]].attackPower_increment=6;//sets increment for attack power - this will be added to temp attack power after each attack
	charObjects[characters[i]].counterAttackPower=4+4*i;//amount of damage done from opponent on each attack
	charObjects[characters[i]].numWins=0;//will increment on each victory
	charObjects[characters[i]].numLosses=0;//will increment on each defeat
}

var button,imageButton,textDiv,parentDiv;		

for(var i=0; i<characters.length;i++){
	//want to create a parentDiv that will have both the text and the button in it
	//want to create a button that will show picture in it - this picture is called imageButton here
	//behind this button, is a textDiv that shows stats of name, health and attack power
	//the button and the textDiv will be appended to parentDiv
	//parentDiv will be appended to the choose player menu div (selector="div#choose")
	parentDiv=$("<div>");
	button=$("<button>");
	imageButton=$("<img>");
	textDiv=$("<div>");
	parentDiv.addClass("container_player");
	button.attr("id","button"+i);
	button.attr("value",characters[i]);
	imageButton.attr("src",charObjects[characters[i]].picture);
	imageButton.addClass("img-responsive");
	textDiv.addClass("buttontext");
	textDiv.html("Name: " + charObjects[characters[i]].name + "<br>HP: " + charObjects[characters[i]].healthPoints_orig + "<br>Attack: " + charObjects[characters[i]].attackPower_origin);
	button.append(imageButton);
	parentDiv.append(button);
	parentDiv.append(textDiv);
	$("div#choose").append(parentDiv);
}

for(var i=0; i<characters.length;i++){
	parentDiv=$("<div>");
	button=$("<button>");
	imageButton=$("<img>");
	textDiv=$("<div>");
	parentDiv.addClass("container_opponent");
	button.attr("id","button" + i + "_opponent");
	button.attr("value",characters[i]);
	button.addClass("opponents");
	imageButton.attr("src",charObjects[characters[i]].picture);
	imageButton.addClass("img-responsive");
	textDiv.addClass("buttontext");
	textDiv.html("Name: " + charObjects[characters[i]].name + "<br>HP: " + charObjects[characters[i]].healthPoints_orig + "<br>Counter Attack: " + charObjects[characters[i]].counterAttackPower);
	button.append(imageButton);
	parentDiv.append(button);
	parentDiv.append(textDiv);
	$("div#opponents").append(parentDiv);
}

$("#choose>.container_player>button").on("click",function(){
	currPlayer = $(this).attr("value");
	fade();
	$("body").css("backgroundImage","url(\""+charObjects[currPlayer].backgroundImage+"\")");
	$("#player>button#chosenPlayer").css("display","block");
	imageButton=$("<img>");
	button=$("#player>button#chosenPlayer");
	imageButton.attr("src",$(this).find("img").attr("src"));
	button.append(imageButton);
	$("#chosenPlayer").attr("value",currPlayer);
	$("#attack").attr("value",currPlayer);
	audioElement_fx.attr("src", charObjects[currPlayer].sound_greeting);
	audioElement_fx.get(0).play();
	$(".jumbotron").css("visibility","visible");
	$("#player>.stats").css("display","block");
	$(".stats>#numWins_player").css("display","block");
	$(".stats>#numWins_player").text("Number of Wins: " + charObjects[currPlayer].numWins);
	$(".stats>#numLosses_player").css("display","block");
	$(".stats>#numLosses_player").text("Number of Losses: " + charObjects[currPlayer].numLosses);
	$(".stats>#healthPoints_player").css("display","none");
	$(".stats>#attackPower_player").css("display","none");			
	usedCharacters.push(currPlayer);

})

fadeSequence = function(element,style){
	switch(style) {
		case 0:
			$(element).each(function(i){
				$(this).delay(30*i).fadeIn(30);
			});
			break;
		case 1:
			$(element).each(function(i){
				$(this).delay(30*i).fadeOut(30);
			});
			break;
		case 2:
			$(element).each(function(i){
				if(usedCharacters.indexOf($(this).find("button").attr("value"))===-1){
					$(this).delay(30*i).fadeIn(30);
				}
			});
			break;
		case 3:
			$(element).each(function(i){
				if(usedCharacters.indexOf($(this).find("button").attr("value"))===-1){
					$(this).delay(30*i).fadeOut(30);
				}
			});
			break;
	}
}

fade = function() {
	fadeSequence(".container_player",1);
	$("#choose>p").delay(330).fadeOut(30);
	
	$("#opponents>p").css("display","inline");
	fadeSequence(".container_opponent",2);
	$("#button" + characters.indexOf(currPlayer) + "_opponent").parent().fadeOut(0);
}

$("#opponents>.container_opponent>button").on("click",function(){
	currOpponent = $(this).attr("value");
	$("#opponent>button").css("display","inline");
	imageButton=$("<img>");
	button=$("#opponent>button");
	imageButton.attr("src",$(this).find("img").attr("src"));
	button.append(imageButton);
	$("#button" + characters.indexOf(currOpponent) + "_opponent").parent().fadeOut(0);
	$("#chosenOpponent").attr("value",currOpponent);
	audioElement_fx.attr("src", charObjects[currOpponent].sound_greeting);
	audioElement_fx.get(0).play();
	$("#startGame").css("visibility","visible");
	$("#opponents>.container_opponent>button").prop("disabled",true);
	$("#opponent>.stats").css("display","block");
	$(".stats>#numWins_opponent").css("display","block");
	$(".stats>#numWins_opponent").text("Number of Wins: " + charObjects[currOpponent].numWins);
	$(".stats>#numLosses_opponent").css("display","block");			
	$(".stats>#numLosses_opponent").text("Number of Losses: " + charObjects[currOpponent].numLosses);
	$(".stats>#healthPoints_opponent").css("display","none");
	$(".stats>#counterAttackPower_opponent").css("display","none");	
	usedCharacters.push(currOpponent);
	$("#opponents>.container_opponent>button").css("opacity","1.0");
})

$("#startGame").on("click",function(){
	audioElement_song.attr("src", "../sounds/fight song.mp3");
	audioElement_song.get(0).play();
	$("#startGame").css("visibility","hidden");
	$("#attack").css("display","inline");
	$(".stats>#numWins_opponent").css("display","none");
	$(".stats>#numLosses_opponent").css("display","none");
	$(".stats>#numWins_player").css("display","none");
	$(".stats>#numLosses_player").css("display","none");
	$(".stats>#healthPoints_player").css("display","block");
	$(".stats>#healthPoints_player").text("Health Points: " + charObjects[currPlayer].healthPoints_curr);
	$(".stats>#attackPower_player").css("display","block");
	$(".stats>#attackPower_player").text("Attack: " + charObjects[currPlayer].attackPower_temp);
	$(".stats>#healthPoints_opponent").css("display","block");
	$(".stats>#healthPoints_opponent").text("Health Points: " + charObjects[currOpponent].healthPoints_curr);
	$(".stats>#counterAttackPower_opponent").css("display","block");
	$(".stats>#counterAttackPower_opponent").text("Counter Attack: " + charObjects[currOpponent].counterAttackPower);
})

$("#restartGame").on("click",function(){
	$("#restartGame").css("visibility","hidden");
	$("#choose>p").fadeIn(30);
	fadeSequence(".container_player",0);			
	$("#opponents>.container_opponent>button").prop("disabled",false);
	for (var i=0; i<characters.length;i++){
		charObjects[characters[i]].healthPoints_curr=charObjects[characters[i]].healthPoints_orig
		charObjects[characters[i]].attackPower_temp=charObjects[characters[i]].attackPower_origin
	}
})

$("#attack").on("click",function(){
	audioElement_fx.attr("src", charObjects[currPlayer].sound_attack);
	audioElement_fx.get(0).play();
	if (charObjects[currPlayer].healthPoints_curr > 0){
		charObjects[currOpponent].healthPoints_curr = charObjects[currOpponent].healthPoints_curr - charObjects[currPlayer].attackPower_temp;
		charObjects[currPlayer].attackPower_temp = charObjects[currPlayer].attackPower_temp + charObjects[currPlayer].attackPower_increment;
		charObjects[currPlayer].healthPoints_curr=charObjects[currPlayer].healthPoints_curr-charObjects[currOpponent].counterAttackPower;
		$("#healthPoints_player").text("Health Points: " + charObjects[currPlayer].healthPoints_curr);
		$("#attackPower_player").text("Current Attack: " + charObjects[currPlayer].attackPower_temp);
		$("#healthPoints_opponent").text("Health Points: " + charObjects[currOpponent].healthPoints_curr);
		$("#counterAttackPower_opponent").text("Counter Attack: " + charObjects[currOpponent].counterAttackPower);
		if (charObjects[currOpponent].healthPoints_curr <= 0){
			audioElement_song.get(0).pause();
			charObjects[currPlayer].numWins+=1;
			charObjects[currOpponent].numLosses+=1;
			setUpModal("win");
		} else if (charObjects[currPlayer].healthPoints_curr <= 0){ 
			charObjects[currOpponent].healthPoints_curr = charObjects[currOpponent].healthPoints_orig;
			audioElement_song.get(0).pause();
			charObjects[currPlayer].numLosses+=1;
			charObjects[currOpponent].numWins+=1;
			setUpModal("loss");
		}
	}

})

setUpModal = function(result){
	if(result==="win" && charObjects[currPlayer].healthPoints_curr > 0){
		var image=$("<img>");
		image.attr("src",charObjects[currPlayer].victoryPic);
		$(".modal-body").append(image);
		$(".modal-body>img").css("height","400px");

		$(".modal-footer>.result").html("Next Opponent");

		var resultMessage=$("<h1>");
		resultMessage.text("You won! You beat " + currOpponent + "!");
		$(".modal-header").append(resultMessage);

		$(".modal-footer>.result").attr("result","won");
		$('#myModal').modal({backdrop: 'static', keyboard: false});  
		$("#myModal").modal("show");
	} else if(result==="win" && charObjects[currPlayer].healthPoints_curr <= 0){
		var image=$("<img>");
		image.attr("src","../images/choose new character.jpg");
		$(".modal-body").append(image);
		$(".modal-body>img").css("height","400px");
		$(".modal-footer>.result").html("Restart Game");
		var resultMessage=$("<h1>");
		resultMessage.text("Although you beat " + currOpponent + ", your health was fully depleted! Choose new character.");
		$(".modal-header").append(resultMessage);
		$(".modal-footer>.result").attr("result","choose");
		$('#myModal').modal({backdrop: 'static', keyboard: false});  
		$("#myModal").modal("show");
	} else if(result==="loss") {
		var image=$("<img>");
		image.attr("src",charObjects[currOpponent].victoryPic);
		$(".modal-body").append(image);
		$(".modal-body>img").css("height","400px");
		$(".modal-footer>.result").html("Restart Game");
		var resultMessage=$("<h1>");
		resultMessage.text("You lost! You were beaten by " + currOpponent + "!");
		$(".modal-header").append(resultMessage);
		$(".modal-footer>.result").attr("result","lost");
		$('#myModal').modal({backdrop: 'static', keyboard: false});  
		$("#myModal").modal("show");
	}
}

$(".modal-footer>.result").on("click",function(){
	if(usedCharacters.length<10){
		if($(".modal-footer>.result").attr("result")==="won"){
			$(".stats>#numWins_player").css("display","block");
			$(".stats>#numWins_player").text("Number of Wins: " + charObjects[currPlayer].numWins);
			$(".stats>#numLosses_player").css("display","block");
			$(".stats>#numLosses_player").text("Number of Losses: " + charObjects[currPlayer].numLosses);
			$(".stats>#healthPoints_player").css("display","none");
			$(".stats>#attackPower_player").css("display","none");
			$(".stats>#healthPoints_opponent").css("display","none");
			$(".stats>#counterAttackPower_opponent").css("display","none");
			$("#opponent>.stats").css("display","none");
			$("#opponent>button>img").remove();
			$("#opponent>button").css("display","none");
			$("#attack").css("display","none");
			$("#opponents>.container_opponent>button").prop("disabled",false);
			$(".modal-body>img").remove();
			$(".modal-header>h1").remove();
			fadeSequence(".container_opponent",2);					
			charObjects[currOpponent].healthPoints_curr=charObjects[currOpponent].healthPoints_orig;
		} else if($(".modal-footer>.result").attr("result")==="lost"){
			$(".jumbotron").css("visibility","hidden");
			$("#choose>p").fadeIn(30);
			$("#opponent>.stats").css("display","none");
			$("#opponent>button>img").remove();
			$("#opponent>button").css("display","none");
			$("#player>.stats").css("display","none");
			$("#player>button#chosenPlayer").css("display","none");
			$("#player>button#chosenPlayer>img").remove();
			$("#attack").css("display","none");
			usedCharacters.splice(usedCharacters.indexOf(currOpponent));
			fadeSequence(".container_player",2);
			$(".modal-body>img").remove();
			$(".modal-header>h1").remove();
			$("#opponents>p").css("display","none");
			fadeSequence(".container_opponent",1);
			$("body").css("backgroundImage","url(\"../images/Super Smash Brothers Background.png\")");
			$("#opponents>.container_opponent>button").prop("disabled",false);
		} else if($(".modal-footer>.result").attr("result")==="choose"){
			$(".jumbotron").css("visibility","hidden");					
			$("#choose>p").fadeIn(30);
			$("#opponent>.stats").css("display","none");
			$("#opponent>button>img").remove();
			$("#opponent>button").css("display","none");
			$("#player>.stats").css("display","none");
			$("#player>button#chosenPlayer").css("display","none");
			$("#player>button#chosenPlayer>img").remove();
			$("#attack").css("display","none");
			fadeSequence(".container_player",2);
			$("#opponents>p").css("display","none");
			fadeSequence(".container_opponent",1);
			$(".modal-body>img").remove();
			$(".modal-header>h1").remove();				
			$("body").css("backgroundImage","url(\"../images/Super Smash Brothers Background.png\")");
			$("#opponents>.container_opponent>button").prop("disabled",false);
		}
	} else {
		$(".modal-body>img").remove();
		$(".modal-header>h1").remove();					
		$("body").css("backgroundImage","url(\"../images/Super Smash Brothers Background.png\")");
		usedCharacters=[];
		$("#restartGame").css("visibility","visible");
		$("#opponents>p").css("display","none");
		fadeSequence(".container_opponent",1);
		fadeSequence(".container_player",1);
		$("#attack").css("display","none");
		$("#player>button#chosenPlayer").css("display","none");
		$("#opponent>.stats").css("display","none");
		$("#player>.stats").css("display","none");
		$("#opponent>button>img").remove();
		$("#player>button>img").remove();
		$("#opponent>button").css("display","none");
		$("#player>button").css("display","none");
		$(".jumbotron").css("visibility","hidden");
	}
})

$(function(){
    $("#choose>.container_player>button").on('mouseover', function(){
       $(this).css('opacity','0.0');
       $(this).siblings('.buttontext').css('opacity','1.0');
    }); 
    $("#choose>.container_player>button").on('mouseout', function(){
       $(this).css('opacity','1.0');
       $(this).siblings('.buttontext').css('opacity','0.0');
    });
   	$("#opponents>.container_opponent>button").on('mouseover', function(){
       $(this).css('opacity','0.0');
       $(this).siblings('.buttontext').css('opacity','1.0');
    }); 
    $("#opponents>.container_opponent>button").on('mouseout', function(){
       $(this).css('opacity','1.0');
       $(this).siblings('.buttontext').css('opacity','0.0');
    });

});
