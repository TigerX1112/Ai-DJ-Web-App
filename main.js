sound = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = "";

function preload() {
    sound = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on('pose', gotPoses);
}

function modalLoaded() {
    console.log("Pose net is intiliazed");
}

function draw() {
    image(video, 0, 0, 600, 500);

    flll("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2){
        circle(leftWRistY, leftWristX, 20);
        inNumberLeftWrist = Number(leftWristY);
        remove_decimals = floor(isNumeberLeftWrist);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = "+volume;
        sound.seVolume(volume);
    }
}

function gotPoses(results) {
    if(results.length > 0){
        //console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[0].score;
        document.getElementById("Left Wrist Score = "+scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        //console.log("X = " + leftWristX + " Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        //console.log("X = " + rightWristX + " Y = " + rightWristY);
    }
}

function play_sound() {
    sound.play();
    sound.setRate(1);
}