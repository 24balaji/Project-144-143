song1="";
song2= "";

scoreLeftWrist = 0;
scoreRightWrist = 0;
scoreNose=0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

noseY=0;
noseX=0;

function preload()
{
    song1 =loadSound("music.mp3");
    song2 =loadSound("music2.mp3");
}

function setup()
{
   canvas = createCanvas(600 ,450);
   canvas.center();

   video = createCapture(VIDEO);
   video.hide();

   poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("scoreRightWrist = " + scoreRightWrist);
    scoreNose = results[0].pose.keypoints[0].score;
    console.log("scoreNose = " + scoreNose);

    leftWristX  = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.rightWrist.y;
    console.log("noseX = " + noseX +" noseY = "+ noseY);

  }
}

function draw()
{
    image(video,0,0,600,450);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreNose > 0.2)
    {   
      fill("#2efa05");
      stroke("#2efa05"); 
        circle(noseX,noseY,10);
   
        if(noseX > 0 && noseX <=300)
        {
          document.getElementById("song_name").innerHTML= "Song Name :Harry Potter Song";
          song1.play();
        }
      } else if(noseX > 300 && noseX <=600)
        {
          document.getElementById("song_name").innerHTML= "Song Name :Peter Pan Themed Song";
          song2.play();
        }
     
        

     if(scoreRightWrist > 0.2)
     {
      
         circle(rightWristX,rightWristY,20);
    
         if(rightWristY > 0 && rightWristY <=100)
         {
           document.getElementById("speed").innerHTML= "Speed = 0.5 x";
           song.rate(0.5);
         }
         else if(rightWristY > 100 && rightWristY <=200)
         {
           document.getElementById("speed").innerHTML= "Speed = 1x";
           song.rate(1);
         }
         else if(rightWristY > 200 && rightWristY <=300)
         {
           document.getElementById("speed").innerHTML= "Speed = 1.5x";
           song.rate(1.5);
         }
         else if(rightWristY > 300 && rightWristY <=400)
         {
           document.getElementById("speed").innerHTML= "Speed = 2x";
           song.rate(2);
         }
         else if(rightWristY > 400 && rightWristY <=500)
         {
           document.getElementById("speed").innerHTML= "Speed = 2.5x";
           song.rate(2.5);
         }
      }

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    volume = floor(InNumberleftWristY)/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}



function modelLoaded() {
   console.log("PoseNet is Initialized");
}

function stop()
{
    song.stop();
}