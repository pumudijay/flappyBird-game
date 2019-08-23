
/*set canvas*/
var cvs=document.getElementById("canvas");


/*context*/
var ctx=cvs.getContext("2d");

/*load image*/
var bird = new Image();
var bg = new Image();	/*background*/
var fg = new Image();	/*floorground*/
var pipeNorth = new Image();
var pipeSouth = new Image();	

bird.src="images/bird.png";
bg.src="images/bg.png";
fg.src="images/fg.png";
pipeNorth.src="images/pipeNorth.png";
pipeSouth.src="images/pipeSouth.png";

//bird initial position
var bX=10;
var bY=150;

var gravity=1;
var score=0;

//audio files
//var fly=new Audio();
//var scoring= new Audio();

//fly.src="";
//scoring.src="";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp()
{
	bY-=25;
	//fly.play();
}

//pipe cordinates

var pipe=[];

pipe[0]={
	x:cvs.width,
	y:0
};

/*draw images*/
function draw()
{
	ctx.drawImage(bg,0,0);

	var gap =pipeNorth.height+85;

	for (var i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);

		ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+gap);

		pipe[i].x--;

		if (pipe[i].x == 125) {

			pipe.push({

				x:cvs.width,
				y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
			});
		}

		//failed

		if (bX+bird.width>=pipe[i].x && bX<=pipe[i].x + pipeNorth.width && (bY<=pipe[i].y + pipeNorth.height || bY+bird.height >=pipe[i].y+gap) || (bY+bird.height>=cvs.height-fg.height)) 
		{
			location.reload();//reload page;
		}

		if (pipe[i].x==5) {
			score++;
			//scoring.play();
		}		
	}


	ctx.drawImage(fg,0,cvs.height-fg.height);

	ctx.drawImage(bird,bX,bY);

	bY+=gravity;

	ctx.fillStyle="000";
	ctx.font="20px Verdana";
	ctx.fillText("Score :" + score ,10,cvs.height-20);	//display position x:10,y:cvs.height-20

	requestAnimationFrame(draw);
}

draw();
