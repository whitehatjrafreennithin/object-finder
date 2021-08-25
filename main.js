video = ""
object_detector = ""

function setup() {
    canvas = createCanvas(480, 310);
    canvas.center()
    video = createCapture();
    video.hide()

}

function start() {
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Object Detecting"
    object_name = document.getElementById("input").value;
}

function modelLoaded() {
    console.log("Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0)
}

function draw() {

    image(video, 0, 0, 480, 350);


    if (status != "") {
        object_detector.detect(video, gotResult);
        document.getElementById("status").innerHTML = "Status: Object Detected"
        for (i = 0; i < objects.length; i++) {
            stroke("blue")
            fill("red")
            noFill()
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x - 5, objects[i].y - 5);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("num_of_objects").innerHTML = "Number of Objects: " + objects.length;
            if (object_name == objects[i].label) {
                video.stop()
                document.getElementById("num_of_objects").innerHTML = object_name + " Found"
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            }else
            {
                document.getElementById("num_of_objects").innerHTML = object_name+" Not Found";
            }
        
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    if (results) {
        console.log(results);
        objects = results
    }
}