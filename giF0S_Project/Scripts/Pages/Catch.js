//CREATING VARIABLES
//VARIABLES TO DO THE FETCH
var urlToFetch = "";
const requestDefault = "upload.giphy.com/v1/gifs";
const apiKey = "qf6ZWqRanwv9kIXXWpSxlQJmK2zf1UKA";
//CREATING AN OBJECT TO RECORD AND ELEMENTS TO SHOW THE RECORDING
let recorder;
let video = document.querySelector("video");
let image = document.getElementById("gif");
let globe = document.getElementById("globe");
//GETTIN CAPTURE BUTTON
let captureButton = document.getElementById("catchButton");
//GETTING UPLOAD BUTTON
let uploadButton = document.getElementById("upload");
//GETTING REPEAT BUTTON
let repeatButton = document.getElementById("repeat");
//GETTING STOP BUTTON
let stopButton = document.getElementById("stopButton");
//GETTING CANCEL BUTTON
let cancelButton = document.getElementById("cancel");
//CREATING FORMDATA OBJECT
let form = new FormData();

window.onload = function () {
    getCamera();
}

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
    form.append("file", recorder.getBlob(), "myGif.gif");
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

function stopStreamedVideo(videoElem) {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track) {
        track.stop();
    });
    videoElem.srcObject = null;
}

captureButton.addEventListener("click", function () {
    captureButton.style.display = ("none");
    stopButton.style.display = ("flex");
    this.disabled = true;
    stopStreamedVideo(video);
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
                let img = image.src = gifURL;
                localStorage.setItem("gif", img);
            }
        });
        recorder.startRecording();
        recorder.camera = camera;
        document.getElementById('stopButton').disabled = false;
    });
});
document.getElementById('stopButton').addEventListener("click", function () {
    alert("stoped");
    stopButton.style.display = ("none");
    uploadButton.style.display = ("flex");
    repeatButton.style.display = "flex";
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
});

//LISTENING CLICK OVER THE UPLOAD BUTTON
uploadButton.addEventListener("click", function () {
    cancelButton.style.display = "flex";
    uploadButton.style.display = "none";
    repeatButton.style.display = "none";
    image.style.display = "none";
    globe.style.display = "flex";
    console.log(form.get("file"));

    //METHODT POST FOR CREATED GIFScreated gifs
    form.append("api_key", "qf6ZWqRanwv9kIXXWpSxlQJmK2zf1UKA")
    fetch(`http://upload.giphy.com/v1/gifs`, {
        method: "POST",
        body: form,
    })
        .then(function (response) {
            console.log(response);
            if (response.ok) {
                return response.json();

            } else {
                console.log("Request failed")
            }
        })
        .then(function (response) {
            console.log(response);
            toBase64(form.get("file")).then(function (base64){
                localStorage.setItem("gif_" + response.data.id, base64);
            })

            
        })
        .catch(function (error) {
            console.log("Error in the post" + error);
        });
});

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});