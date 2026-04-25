const size=30;
const grid=document.getElementById("grid");

let cells=[];
let isDown=false;

/* mouse */
document.addEventListener("mousedown",()=>isDown=true);
document.addEventListener("mouseup",()=>isDown=false);

/* grid */
for(let y=0;y<size;y++){
  cells[y]=[];
  for(let x=0;x<size;x++){

    let c=document.createElement("div");
    c.className="cell";

    c.layers={
      0:newState(),
      1:newState()
    };

    c.addEventListener("mousedown",e=>{
      e.preventDefault();
      place(c);
    });

    c.addEventListener("mouseover",()=>{
      if(isDown) place(c);
    });

    grid.appendChild(c);
    cells[y][x]=c;
  }
}

function place(c){

  let d=c.layers[currentLayer];

  if(tool==="erase"){
    d.type="empty";
  }else{
    d.type=tool;
  }

  updateWires();
  simulate();
  render();
}

/* render */
function render(){

  for(let y=0;y<size;y++){
    for(let x=0;x<size;x++){

      let c=cells[y][x];
      let d=c.layers[currentLayer];

      c.className="cell";
      c.textContent="";

      if(currentLayer===1) c.classList.add("layer1");

      if(d.type==="wire"){
        c.classList.add("wire",d.shape);
        if(d.dir) c.classList.add(d.dir);
        if(d.shape==="corner") c.classList.add("rot"+d.rot);
      }

      if(d.type==="battery"){
        c.classList.add("battery");
        c.textContent="🔋";
      }

      if(d.type==="bulb"){
        c.classList.add("bulb");
        c.textContent="💡";
        if(d.voltage>0) c.classList.add("on");
      }

      if(d.type==="switch"){
        c.classList.add("switch");
        c.textContent="⏻";
        if(d.state==="on") c.classList.add("on");
      }

      if(d.type==="mosfet"){
        c.classList.add("mosfet");
        c.textContent="M";
        if(d.voltage>0) c.classList.add("on");
      }
    }
  }
}

render();