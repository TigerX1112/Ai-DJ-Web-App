sound = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

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

    fill("#FF0000");
    stroke("#FF0000");

    circle(rightWristX, rightWristY, 20);

    if(scoreRightWrist > 0.2){
    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        sound.setRate(0.5);
    } else if (rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1.0x";
        sound.setRate(1.0);
    } else if (rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        sound.setRate(1.5);
    } else if (rightWristY > 300 && rihgtWristY <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2.0x";
        sound.setRate(2.0);
    } else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        sound.setRate(2.5);
    }
    }

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
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[0].score;
        scoreRightWrist = results[0].pose.keypoints[0].score;
        document.getElementById("Left Wrist Score = "+scoreLeftWrist+ " Right Wrist Score = "+rightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("X = " + leftWristX + " Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("X = " + rightWristX + " Y = " + rightWristY);
    }
}

function play_sound() {
    sound.play();
}