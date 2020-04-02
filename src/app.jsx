import React, {useState} from 'react';

const StartButton = () =>{
  return(
    <button id='startButton'>
      <img id='logo' src="/windows.png" alt="Windows logo"/>
      <span id='start-word'>start</span>
    </button>
  )
}

const TaskBar = () => {
  return(
    <div id='taskBar'>
      <StartButton />
    </div>
  );
};

const Selection = (props) =>{
  const wid = props.mousePosition.x - props.initialPos.x;
  const hei = props.mousePosition.y - props.initialPos.y;
  let px, py, rot;
  if(wid < 0 && hei < 0){
    rot = 180;
    px = props.initialPos.x;
    py = props.initialPos.y;
  } else if (hei < 0){
    rot = 180;
    px = props.initialPos.x + wid/2;
    py = props.initialPos.y;
  } else if (wid < 0){
    rot = 180;
    px = props.initialPos.x;
    py = props.initialPos.y + hei/2;
  }
  return(
    <rect 
      style={{
        display: props.visible,
      }}
      x={props.initialPos.x}
      y= {props.initialPos.y}
      width= {Math.abs(wid)}
      height= {Math.abs(hei)}
      fill='transparent'
      stroke='hsl(0,0%,35%)'
      strokeDasharray='1,2'
      transform= {`rotate(${rot} ${px} ${py})`}
    ></rect>
  );
};

const Desktop = () => {
  const [initialPos, handleInitialPos] = useState({x:0, y:0})
  const [mouseMove, handleMouseMove] = useState({x:0, y:0});
  const [showSelect, handleShowSelect] = useState('none')

  const mouseClicked = event =>{
    handleMouseMove({x:event.clientX, y: event.clientY});
    handleInitialPos({x:event.clientX, y: event.clientY});
    handleShowSelect('block')
  }

  const mouseMoved = event =>{
    handleMouseMove({x:event.clientX, y: event.clientY})
  }
  return(
    <div id='desktopContainer'>
      <svg 
        id='desktop'
        onMouseDown={(e)=>{mouseClicked(e)}}
        onMouseMove={(e)=>{mouseMoved(e)}}
        onMouseUp={()=>{handleShowSelect('none')}}
      >
        <Selection 
          initialPos={initialPos}
          mousePosition={mouseMove}
          visible={showSelect}
        />
      </svg>
    </div>
  );
};

const Screen = () =>{
  return(
    <>
      <Desktop />
      <TaskBar />
    </>
  );
};

export default Screen;
