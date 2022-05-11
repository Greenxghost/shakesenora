let urlSound = "http://localhost:1234/shakesenora.mp3";

let shaker = document.getElementById('senora');
let starter = document.getElementById('starter');
let loaded = false;
let audioCtx;
console.log(window.innerHeight / 2 + 0.5)
const onMouseMove = (e) => {
  shaker.style.left = (e.pageX - 70) + 'px';
  shaker.style.top = (e.pageY- 90) + 'px';
  let intFrameHeight = window.innerHeight;


  if (e.pageY === Math.round(intFrameHeight / 2)) {
    playNote();
  }
}


/******/

const loadSound = () => {
   audioCtx = new AudioContext();

  source = audioCtx.createBufferSource();
  buff = null;
  var myRequest = new Request(urlSound);

  fetch(myRequest).then(function(response) {
    return response.arrayBuffer();
  }).then(function(buffer) {
    audioCtx.decodeAudioData(buffer, function(decodedData) {
      shaker.classList.add("ekahs");

      source.buffer = decodedData;
      buff = decodedData;
      source.connect(audioCtx.destination);
      source.start(0,0);
      const myTimeout = setTimeout(()=>{audioCtx.suspend()}, 1000);
      console.log(audioCtx.state);


    });
  });
};

const playNote = () => {
  if(!loaded){
    loaded = true;

  }

  if(audioCtx.state === 'running') {

    //nothing

  } else if(audioCtx.state === 'suspended') {
    console.log(audioCtx.state);
    audioCtx.resume().then(function() {
      const myTimeout = setTimeout(()=>{audioCtx.suspend()}, 1000);

    });
  }
};

starter.onclick = function(){
  starter.style.display= "none";
  loadSound();
};


document.addEventListener('mousemove', onMouseMove);


