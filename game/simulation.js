function simulate(){

  for(let layer of [0,1]){
    for(let row of cells){
      for(let c of row){
        let d=c.layers[layer];
        d.voltage = (d.type==="battery") ? 10 : 0;
      }
    }
  }

  for(let step=0; step<10; step++){
    for(let y=0;y<size;y++){
      for(let x=0;x<size;x++){

        for(let layer of [0,1]){

          let d=cells[y][x].layers[layer];
          let v=d.voltage;
          if(v<=0) continue;

          let dirs=[[1,0],[-1,0],[0,1],[0,-1]];

          for(let [dx,dy] of dirs){
            let nx=x+dx, ny=y+dy;
            if(nx<0||ny<0||nx>=size||ny>=size) continue;

            let n=cells[ny][nx].layers[layer];

            if(n.type==="switch" && n.state==="off") continue;

            if(n.type==="mosfet"){
              let inputs=0;
              for(let [ddx,ddy] of dirs){
                let tx=nx+ddx, ty=ny+ddy;
                if(tx<0||ty<0||tx>=size||ty>=size) continue;

                if(cells[ty][tx].layers[layer].voltage>0){
                  inputs++;
                }
              }
              if(inputs>=2){
                n.voltage=Math.max(n.voltage,v-1);
              }
              continue;
            }

            if(n.type!=="empty"){
              let newV=v-1;
              if(newV>n.voltage){
                n.voltage=newV;
              }
            }
          }
        }
      }
    }
  }
}