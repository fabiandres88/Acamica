//CREATING VARIABLES
//GETTIN CAPTURE BUTTON
let captureButton = document.getElementById("catchButton");
captureButton.addEventListener("click", getRecord);

function getRecord () {
    navigator.mediaDevices.getUserMedia({
        audio:false,
        video : { width : 900,
             height:480 }
    })
    .then(function(stream){
        let video = document.querySelector("video");
        video.srcObject = stream;
        video.onloadedmetadata = function (e){
            video.play();
        };        
    })
    .catch(error => {
        console.error("error", error);
    })
}
recorder = RecordRTC(stream,{
    type : 'gif',
    frameRate : 1,
    quality : 10,
    width : 360,
    hidden : 240,
})