//CREATING VARIABLES
let recorder;
let video = document.querySelector("video");
let image = document.getElementById("gif");
//GETTIN CAPTURE BUTTON
let captureButton = document.getElementById("catchButton");
captureButton.addEventListener("click",getCamera);

//GETTING RECORD BUTTON
let recordButton = document.getElementById("recordButton");

//THIS FUNCTION STARTS THE CAMERA
function getCamera(stream) {
    navigator.mediaDevices.getUserMedia({
        video: true,
    })
        .then(function (stream) {            
            video.srcObject = stream;
            video.onloadedmetadata = function () {
                video.play();
            };
        })
        .catch(error => {
            console.error("error", error);
        });
}

//THIS FUNCTION START THE RECORDNG
function getRecord(callback) {
    navigator.mediaDevices.getUserMedia({
        video: true,
    })
        .then(function (camera) {
            callback(camera);
        })
        .catch(error => {
            console.error("error", error);
        });
}

function stopRecordingCallback() {
    document.querySelector('#statuscapture').innerHTML = 'Gif recording stopped: ' + bytesToSize(recorder.getBlob().size);
    image.src = URL.createObjectURL(recorder.getBlob());
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

recordButton.addEventListener("click", function () {
    this.disabled = true;
    getRecord(function (camera) {
        video.style.display = "none";
        document.getElementById('statuscapture').innerHTML = 'Waiting for Gif Recorder to start...';
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function () {
                document.getElementById('statuscapture').innerHTML = 'Gif recording started.';
            },
            onGifPreview: function (gifURL) {
               let img= image.src = gifURL;
                localStorage.setItem("gif", img);
            }
        });
        recorder.startRecording();
        recorder.camera = camera;
        document.getElementById('stopButton').disabled = false;
    });
});
document.getElementById('stopButton').addEventListener("click", function () {
    alert("stoped")
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
});