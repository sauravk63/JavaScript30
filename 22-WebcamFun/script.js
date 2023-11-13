const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true, audio:false})
    .then(localMediaStream=>{
        console.log(localMediaStream);
        video.srcObject = localMediaStream
        video.play();
    }).catch(err=>{
        console.log("UNABLE TO LOAD CAMERA !! ", err);
    })
}


function paintToCanvas(){
    
    const width =  video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval( () => {
        ctx.drawImage(video, 0, 0, width, height);
    

        // take the pixels out

        let pixels = ctx.getImageData(0, 0, width, height);

        // mess with them
        //pixels = redEffect(pixels);

        // pixels = rgbSplit(pixels);
       // ctx.globalAlpha = 0.8;

        
        // put them back
        ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto(){
    //play the image capture sound
    snap.currentTime = 0;
    snap.play();

    ///take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    //console.log(data);
    link.setAttribute('download','Pic');
    //link.textContent = 'Download Image';
    strip.insertBefore(link, strip.firstChild);
    link.innerHTML = `<img src="${data}" alt="captured image"/>`;
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
      pixels.data[i + 1] = pixels.data[i + 1] - 150; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
  }
  
  function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i - 50] = pixels.data[i + 0]; // RED
      pixels.data[i + 300] = pixels.data[i + 1]; // GREEN
      pixels.data[i - 250] = pixels.data[i + 2]; // Blue
    }
    return pixels;
  }

getVideo();

video.addEventListener('canplay', paintToCanvas);