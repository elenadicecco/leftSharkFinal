var app = function(app) {
		app.makeHorizontalPages = function(layoutManager, gridManager) {
		
		var p = {};
		
		// make main page
		p.main = new createjs.Container();
		p.main.name = "main";
		p.main.setBounds(0,0,stageW,stageH);
		
		// prepare content
		var mainContent = p.main.content = new createjs.Container();
		mainContent.setBounds(0,0,stageW,stageH);
		p.main.addChild(mainContent);

		var textContainer = new createjs.Container();  

		p.main.content.addChild(textContainer);

		var instructionsContainer = new createjs.Container();  

		p.main.content.addChild(instructionsContainer);

		var swipeLeftContainer = new createjs.Container();  

		p.main.content.addChild(swipeLeftContainer);

		var titleText = new createjs.Text();
		titleText.textAlign = "center";
		titleText.textBaseline = "top";
		titleText.font = "50px Helvetica";
		titleText.color = "#8fb6e1";
		titleText.text = "Left Shark";

		var instructions = new createjs.Text();
		instructions.textAlign = "center";
		instructions.textBaseline = "middle";
		instructions.font = "30px Helvetica";
		instructions.color = "#FFFFFF";
		instructions.text = "Press the left and right side" + "\n" +  "of the screen to make" + "\n" + "Left Shark dance!";

		var swipeLeftText = new createjs.Text();
		swipeLeftText.textAlign = "center";
		swipeLeftText.textBaseline = "bottom";
		swipeLeftText.font = "30px Helvetica";
		swipeLeftText.color = "#8fb6e1";
		swipeLeftText.text = "Swipe left to begin.";

		var textContainerBounds = textContainer.getBounds();
		textContainer.regX = textContainerBounds/2;
		textContainer.regY = textContainerBounds/2;
		textContainer.x = stageW/2;
		textContainer.y = stageH/8;

		var instructionsContainerBounds = instructionsContainer.getBounds();
		instructionsContainer.regX = instructionsContainerBounds/2;
		instructionsContainer.regY = instructionsContainerBounds/2;
		instructionsContainer.x = stageW/2;
		instructionsContainer.y = stageH/3;

		var swipeLeftContainerBounds = swipeLeftContainer.getBounds();
		swipeLeftContainer.regX = textContainerBounds/2;
		swipeLeftContainer.regY = textContainerBounds/2;
		swipeLeftContainer.x = stageW/2;
		swipeLeftContainer.y = stageH - 200;

		textContainer.addChild(titleText);
		instructionsContainer.addChild(instructions);
		swipeLeftContainer.addChild(swipeLeftText);

		layoutManager.add(
			new zim.Layout(p.main, 
				[{object:p.main.content, marginTop:10, maxWidth:80, minHeight:20, backgroundColor:"#061d36" }],
				10, "#061d36", true, null, stage)		
		);	
		
		p.info = new createjs.Container();
		p.info.name = "info";
		p.info.setBounds(0,0,stageW,stageH);

		var infoBacking = new zim.Rectangle(stageW,stageH,"#8fb6e1");
		p.info.addChild(infoBacking);

		createjs.Ticker.addEventListener("tick", stage);
		createjs.Ticker.setFPS(11);

			var myData = {

				"images": ["assets/images/leftshark-sprite.png"],
				"frames": [

				    [2, 2, 1275, 1528], 
				    [1279, 2, 1275, 1528], 
				    [2556, 2, 1275, 1528], 
				    [2, 1532, 1275, 1528], 
				    [1279, 1532, 1275, 1528], 
				    [2556, 1532, 1275, 1528], 
				    [2, 3062, 1275, 1528], 
				    [1279, 3062, 1275, 1528], 
				    [2, 2, 1275, 1528], 
				    [2556, 3062, 1275, 1528], 
				    [2, 4592, 1275, 1528], 
				    [2, 6122, 1275, 1528], 
				    [1279, 4592, 1275, 1528], 
				    [1279, 6122, 1275, 1528], 
				    [2556, 4592, 1275, 1528], 
				    [2556, 6122, 1275, 1528]
				],
				"animations":{
					"stand": [0],
					"leftArm": [1,7],
					"rightArm": [9,15]
				}
			} 
		
		var spritesheet = new createjs.SpriteSheet(myData);
		var dance = p.dance = new createjs.Sprite(spritesheet, "stand"); 
		dance.regY = dance.getBounds().height/2;
		dance.regX = dance.getBounds().width/2;
		dance.y = stageH/2;
		dance.x = stageW/2;
		//dance.scaleX = dance.scaleY = .4;
		dance.on("animationend", function(){dance.stop()})
		infoBacking.addEventListener("click", clickHandler);

	// 	function loadSound() {

	//        var queue = new createjs.LoadQueue();
	// 	createjs.Sound.alternateExtensions = ["mp3"];
	//        queue.installPlugin(createjs.Sound);
	//        queue.addEventListener("complete", playSound);
	//        queue.loadManifest([
	//            {id:"mySound", src:"assets/teenageDream.ogg"}
	//        ]);

	//        zog("loading");
	// }

	// var play = false;

 //    function playSound(event) {
 //    	play = true

 //        // Play the loaded sound
 //        createjs.Sound.play("mySound", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
 //     	zog("playing");
 //    }

		function clickHandler(e){
			
			// if (play == false){
			// 	loadSound();
			// }

			console.log(e);
			if (e.stageX > stageW/2){
				dance.gotoAndPlay("rightArm");

			}else {
				dance.gotoAndPlay("leftArm");
			}
		}
		
		p.info.addChild(dance);
		stage.update();
		
		return p;	
	}
	
	return app;
}(app || {});