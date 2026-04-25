function updateWires(){

  for(let y=0;y<size;y++){
    for(let x=0;x<size;x++){

      let d=cells[y][x].layers[currentLayer];
      if(d.type!=="wire") continue;

      let up = isWire(x,y-1);
      let down = isWire(x,y+1);
      let left = isWire(x-1,y);
      let right = isWire(x+1,y);

      let count = up+down+left+right;

      if(count>=3){
        d.shape="cross";
        continue;
      }

      if(left && right){
        d.shape="straight"; d.dir="h"; continue;
      }

      if(up && down){
        d.shape="straight"; d.dir="v"; continue;
      }

      if(right && down){ d.shape="corner"; d.rot=0; continue; }
      if(down && left){ d.shape="corner"; d.rot=1; continue; }
      if(left && up){ d.shape="corner"; d.rot=2; continue; }
      if(up && right){ d.shape="corner"; d.rot=3; continue; }

      d.shape="straight"; d.dir="h";
    }
  }
}

function isWire(x,y){
  if(x<0||y<0||x>=size||y>=size) return false;
  return cells[y][x].layers[currentLayer].type==="wire";
}