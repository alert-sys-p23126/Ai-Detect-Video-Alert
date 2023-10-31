function startVideo(videoElementId) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            let video = document.getElementById(videoElementId);
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function (e) {
                video.play();
            };
            // Mirror image
            //video.style.webkitTransform = "scaleX(-1)";
            video.style.transform = "scaleX(-1)";
        });
    }
}


function getFrame(src, dest, dotNetHelper) {

    let video = document.getElementById(src);
    let canvas = document.getElementById(dest);
    canvas.getContext('2d').drawImage(video, 0, 0, 320, 240);

    let dataUrl = canvas.toDataURL("image/jpeg");
    dotNetHelper.invokeMethodAsync('ProcessImage', dataUrl);
}

let mediaStream = null;

async function startCapture(videoElement) {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = mediaStream;
    } catch (e) {
        console.error("Error starting capture: ", e);
    }
}

function stopCapture(videoElement) {
    if (mediaStream) {
        let tracks = mediaStream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
    }
}
