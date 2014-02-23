// Your work goes here...

function draw() {

	var canvas = document.getElementById('game');

	if (canvas.getContext){
  		var ctx = canvas.getContext('2d');
  			
  			// drawing dirt road
  			//ctx.fillStyle = "#C96A1B";
    		//ctx.fillRect (0, 450, 800, 150);
    		
    		var img = new Image();
    		img.onload = function() {
    		
    			//draw tree
    			ctx.drawImage(img,0,270,80,130,0,100,250,400);
    			
    			//draw bushes and dirt road
    			ctx.drawImage(img,0,710,900,180,0,350,800,250);
    			
    			//draw dog sniffing
    			ctx.drawImage(img,0,0,60,45,50,500,120,90);
    			
    			//draw birds
    			ctx.drawImage(img,0,118,35,35,300,100,70,70);
    			ctx.drawImage(img,130,118,35,35,400,100,70,70);
    			ctx.drawImage(img,260,118,35,35,500,100,70,70);
    			ctx.drawImage(img,40,156,35,35,300,200,70,70);
    			ctx.drawImage(img,300,194,35,35,400,200,70,70);
    			
    			
    			
    		};
    		img.src = "assets/duckhunt.png";

  
  
  
  
  
	} else {
  		// canvas-unsupported code here
	}

}