import Widget from "./widget.js";

const widget = new Widget(document.querySelector('.container'));
widget.createTimeline();

const input = document.querySelector('.input');

input.addEventListener('keydown', (e) => {
  if(e.code == 'Enter') {
    widget.checkGeoLocAPI();    
  }
});

widget.addVideo();

