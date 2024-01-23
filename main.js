music1 = "";
music2 = "";
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;
leftWristScore = 0;
rightWristScore = 0;

function preload() {
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(500,500);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on("pose", get_results);
}

function draw() {
    image(video, 0, 0, 500, 500);
    fill("red");
    stroke("black");
    if (leftWristScore > 0.2) {
        circle(lwx, lwy, 20);
        if(music1.isPlaying()==false){
            music2.stop();
            music1.play();
            document.getElementById("song_name").innerHTML="Harry Potter is playing";
        }
    }
    if(rightWristScore>0.2){
        circle(rwx, rwy, 20);
        if(music2.isPlaying()==false){
            music1.stop();
            music2.play();
            document.getElementById("song_name").innerHTML="Peter Pan is playing";
        }
    }
}

function modelloaded() {
    console.log("model loaded succesfully!");
}

function get_results(r) {
    if (r.length > 0) {
        console.log(r);
        lwx = r[0].pose.leftWrist.x;
        lwy = r[0].pose.leftWrist.y;
        rwx = r[0].pose.rightWrist.x;
        rwy = r[0].pose.rightWrist.y;
        leftWristScore = r[0].pose.keypoints[9].score;
        rightWristScore = r[0].pose.keypoints[10].score;

    }
}