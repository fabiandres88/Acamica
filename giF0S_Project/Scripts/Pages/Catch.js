// //CREATING VARIABLES
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
//GETTING CHRONO AND STOP BUTTON
let chrono = document.getElementById("chrono");
let stopButton = document.getElementById("stopButton");
//GETTING PLAY A CHARGE BAR
let playGif = document.getElementById("play");
let barCharge = document.getElementById("bar");
let repeatButton = document.getElementById("repeat");
let uploadButton = document.getElementById("upload");
//GETTING CANCEL BUTTON
let cancelButton = document.getElementById("cancel");
//CREATING FORMDATA OBJECT
let form = new FormData();

window.onload = function () {
    this.getCamera();
}

//THIS FUNCTION STARTS THE CAMERA
function getCamera(stream) {
    navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
    })
        .then(function (stream) {
            video.srcObject = stream;
            video.onloadedmetadata = function () {
                video.play();
                video.height = 434;
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
    document.querySelector('#statuscapture').innerHTML = 'Vista Previa';
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
    chrono.style.display = ("flex");
    stopButton.style.display = ("flex");
    this.disabled = true;
    stopStreamedVideo(video);
    getRecord(function (camera) {
        video.style.display = "none";
        document.getElementById('statuscapture').innerHTML = 'Esperando para capturar Guifo...';
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function () {
                document.getElementById('statuscapture').innerHTML = 'Capturando Tu Guifo';
            },
            onGifPreview: function (gifURL) {
                img = image.src = gifURL;
            }
        });
        recorder.startRecording();
        recorder.camera = camera;
        document.getElementById('stopButton').disabled = false;
    });
});

document.getElementById('stopButton').addEventListener("click", function () {
    stopButton.style.display = ("none");
    playGif.style.display = ("flex");
    repeatButton.style.display = "flex";
    uploadButton.style.display = ("flex");
    document.getElementById("charging").style.display = ("flex");
    move();
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
});

//LISTENING CLICK OVER THE UPLOAD BUTTON
uploadButton.addEventListener("click", function () {
    cancelButton.style.display = "flex";
    uploadButton.style.display = "none";
    repeatButton.style.display = "none";
    chrono.style.display = "none";
    playGif.style.display = "none";
    document.getElementById("charging").style.display = ("none");
    image.style.display = "none";
    globe.style.display = "flex";
    document.getElementById('statuscapture').innerHTML = 'Subiendo Guifo';
    UploadCapture();
    document.getElementById("uploading").style.display = "flex";
    document.getElementById("showCapture").style.display = "flex";
    document.getElementById("uploadingGif").style.display = "flex";

    //METHODT POST FOR UPLOAD GIFS CREATED

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

            localStorage.setItem("iD" + response.data.id, response.data.id);
            idGif = ("iD" + response.data.id, response.data.id);
            if (response.meta.status == 200) {
                showResponse()
            }
        })
        .catch(function (error) {
            console.log("Error in the post" + error);
        });
});

function showResponse() {
    image.style.display = "flex";
    globe.style.display = "none";
    document.getElementById("uploadingGif").style.display = "none";
    cancelButton.innerHTML = "Listo";
    cancelButton.style.transform = ("translateY(-740%)");
    document.getElementById('showCapture').style.width = ("62%");
    document.getElementById('showCapture').style.height = ("300px");
    document.getElementById("showCapture").style.marginLeft = ("24px");
    document.getElementById("showCapture").style.marginTop = ("24px");
    document.getElementById("contentFinal").style.display = ("flex");
    document.getElementById("showCapture").style.marginLeft = ("24px");
};

//LISTEING CLICK OVER THE REPEAT CAPTURE BUTTON
repeatButton.addEventListener("click", function () {
    window.location.href = "../../Pages/Catch.html";
});

//LISTEING CLICK OVER THE CANCEL CAPTURE BUTTON
cancelButton.addEventListener("click", function () {
    window.location.href = "../../Pages/Catch.html";
});

//FINCTION TO MANAGE THE CHRONO
let id
captureButton.addEventListener("click", function () {
    setTimeout(function () {
        chronoStart();
    }, 3000)
})
stopButton.addEventListener("click", function () {
    clearInterval(id);
});
function chronoStart() {
    var h = 0;
    var m = 0;
    var s = 0;
    var ms = 0;
    var hCont, mCont, sCont, msCont;

    id = setInterval(function () {
        ms++;
        if (ms > 10) { s++; ms = 0; }
        if (s > 59) { m++; s = 0; }
        if (m > 59) { h++; m = 0; }
        if (h > 24) { h = 0; }

        if (ms < 10) { msCont = "0" + ms; } else { msCont = ms; }
        if (s < 10) { sCont = "0" + s; } else { sCont = s; }
        if (m < 10) { mCont = "0" + m; } else { mCont = m; }
        if (h < 10) { hCont = "0" + h; } else { hCont = h; }

        document.getElementById("chrono").innerHTML = `${hCont}:${mCont}:${sCont}:${msCont}`;

    }, 1);
}

//FUNCTION TO ANIMATE THE CHARGE BAR
function move() {
    var elem = document.getElementById("pinksCharge");
    var width = 1;
    var id = setInterval(frame, 600);
    function frame() {
        if (width >= 16) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

//FUNCTION TO ANIMATE THE CHARGE BAR IN THE UPLOADING GUIFO
function UploadCapture() {
    var elem = document.getElementById("pinkBar");
    var width = 0;
    var id = setInterval(frame, 600);
    function frame() {
        if (width >= 20) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
};

let idGif
let urlGif
function getUrl() {
    let urlfetch = "https://api.giphy.com/v1/gifs/";
    let apiKey = "?api_key=qf6ZWqRanwv9kIXXWpSxlQJmK2zf1UKA";
    let url = urlfetch + idGif + apiKey;
    getById(url);

};

function getById(url) {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            data;
            urlGif = (data.data.images.downsized_large.url);

            return data
        }).catch(error => {
            console.error("fetch failed", error);
        })
}



//THIS FUNCTION LISTEN CLICK OVER THE LAS BUTTON TO COPY OR DOWNLOAD GIF
document.getElementById("download").addEventListener("click", function () {
    var source = document.getElementById("gif").getAttribute("src");
    console.log(source)
    var a = document.createElement('a');

    a.download = true;
    a.target = '_blank';
    a.href = source;

    a.click();
});

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = urlGif;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
document.getElementById("copy").addEventListener("click", function () {
    getUrl();
    setTimeout(function () {
        copyToClipboard();
    }, 3000);

})