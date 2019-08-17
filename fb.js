var cnvs=document.getElementById("canvas");
var cntxt=cnvs.getContext("2d");


var bird=new Image();
bird.src="images/bird.png";
var bg=new Image();
bg.src="images/bg.png";
var fg=new Image();
fg.src="images/fg.png";
var pipeNorth=new Image();
pipeNorth.src="images/pipeNorth.png";
var pipeSouth=new Image();
pipeSouth.src="images/pipeSouth.png";

var gap=90;
var constant ;

var bx=10;
var by=150;

var gravity=1.5;

var fly=new Audio();
var scor=new Audio();

 fly.src="sounds/fly.mp3";
 scor.src="sounds/score.mp3";

document.addEventListener("keydown",moveup);

function moveup()
{
    by-=25;
    fly.play();
}
var pipe = [];

pipe[0] = {
    x : cnvs.width,
    y : 0
}
 var score=0;


function draw()
{
    cntxt.drawImage(bg,0,0);

    for(var i = 0;i < pipe.length; i++)
    {
        constant = pipeNorth.height + gap;
        cntxt.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        cntxt.drawImage(pipeSouth,pipe[i].x, pipe[i].y+constant);  
        pipe[i].x--;
        
        if(pipe[i].x==125){
            pipe.push({
                x : cnvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height //
            }); 
        }

  //collisions

        if(bx + bird.width >= pipe[i].x && bx <= pipe[i].x +pipeNorth.width
            &&(by <= pipe[i].y +pipeNorth.height || by+bird.height >= 
                pipe[i].y+constant) || (by+bird.height >= cnvs.height-fg.height)){
                    location.reload();
                }   
        
        if(pipe[i].x == 5)
        {
            score++;
            scor.play();
        }

    }
    cntxt.drawImage(fg,0,cnvs.height - fg.height);
    cntxt.drawImage(bird,bx,by);

    by+= gravity;

    cntxt.fillStyle = "#000";
    cntxt.font = "20px Verdana";
    cntxt.fillText("score : " +score,10,cnvs.height-20);
    
    requestAnimationFrame(draw);
}
draw();
