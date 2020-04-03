import React, {useState, useEffect} from 'react';

const Shortcut = (props) =>{
  return(
    <g>
      <image 
        x={props.position.x}
        y={props.position.y}
        width='50'
        height='50'
        href={props.source}
      />
      <text
        className='shortcut-text'
        x={props.position.x + props.textAlign}
        y={props.position.y + 70}
      >
        {props.text}
      </text>

    </g>
  );
}


const Tray = () =>{

  const [time, setTime] = useState(new Date());

  useEffect(()=>{
    const id = setInterval(() => {
      setTime(() => new Date())}, 60000);
    return () => {clearInterval(id)};
  }, []);

  return(
    <div 
      id='tray'
      style={{width: '150px'}}
    >
      <div id='clock'>
        {time.toLocaleString([], {hour: '2-digit', minute: '2-digit'})}
      </div>
    </div>
  )
}

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
      <Tray />
    </div>
  );
};

const Selection = (props) =>{
  const wid = props.mousePosition.x - props.initialPos.x;
  const hei = props.mousePosition.y - props.initialPos.y;
  let px, py, rot;
  px = py = rot = 0;
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
        display: props.visible ? 'block': 'none',
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
  const [showSelect, handleShowSelect] = useState(false)
  const [shortcutPos, handleShortcutPos] = useState([{x:50, y:50}])
  const [shortcutMove, handleShortcutMove] = useState(-1)

  const mouseClicked = event =>{
    handleShortcutMove(shortcutPos.findIndex(i =>(
      event.clientX >= i.x && event.clientX <= i.x + 50 &&
      event.clientY >= i.y && event.clientY <= i.y + 50
    )))

    if(shortcutMove === -1){
      handleMouseMove({x:event.clientX, y: event.clientY});
      handleInitialPos({x:event.clientX, y: event.clientY});
      handleShowSelect(true)
    }
  }

  const mouseMoved = event =>{
    shortcutMove !== -1 ? 
      handleShortcutPos([{x: event.clientX, y: event.clientY}]):
      handleMouseMove({x:event.clientX, y: event.clientY})
  }
  return(
    <div id='desktopContainer'>
      <svg 
        id='desktop'
        onMouseDown={(e)=>{mouseClicked(e)}}
        onMouseMove={(e)=>{mouseMoved(e)}}
        onMouseUp={()=>{
          handleShowSelect(false); 
          handleShortcutMove(-1);
        }}
      >
        <Selection 
          initialPos={initialPos}
          mousePosition={mouseMove}
          visible={showSelect}
        />
        <Shortcut 
          source= '/empty-recycle.png'
          text= 'Recycle Bin'
          textAlign= {-15}
          position={shortcutPos[0]}
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
