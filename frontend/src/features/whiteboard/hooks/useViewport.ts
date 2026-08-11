import { useWhiteboard } from "./useWhiteboard";

export default function useViewport() {

  const {

    viewport,

    setViewport,

  } = useWhiteboard();

  //------------------------------------------------

  function zoom(

    delta:number,

    mouseX:number,

    mouseY:number

  ){

    const oldZoom=

      viewport.zoom;

    const newZoom=

      Math.min(

        3,

        Math.max(

          0.25,

          oldZoom+delta

        )

      );

    if(oldZoom===newZoom)
      return;

    const scale=

      newZoom/oldZoom;

    setViewport({

      x:

        mouseX-

        (mouseX-viewport.x)*scale,

      y:

        mouseY-

        (mouseY-viewport.y)*scale,

      zoom:newZoom,

    });

  }

  //------------------------------------------------

  function pan(

    dx:number,

    dy:number

  ){

    setViewport({

      ...viewport,

      x:viewport.x+dx,

      y:viewport.y+dy,

    });

  }

  function resetViewport() {

  setViewport({

    x: 0,

    y: 0,

    zoom: 1,

  });

}
  function setCamera(
  x: number,
  y: number
) {
  setViewport({
    ...viewport,
    x,
    y,
  });
}


  return{viewport,zoom,pan,setCamera,resetViewport,};

}