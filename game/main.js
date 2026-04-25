let tool="wire";
let currentLayer=0;

function setTool(t){ tool=t; }
function setLayer(l){
  currentLayer=l;
  document.getElementById("layerLabel").textContent="Layer: "+l;
  render();
}