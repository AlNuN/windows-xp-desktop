import React, {useState} from 'react';

const TaskBar = () => {
  return(
    <div id='taskBar'></div>
  );
};

const Selection = (props) =>{
  const wid = props.mousePosition.x - props.initialPos.x;
  const hei = props.mousePosition.y - props.initialPos.y;
  return(
    <div 
      className='selection'
      style={{
        display: props.visible,
        left: props.initialPos.x,
        top: props.initialPos.y,
        width: Math.abs(wid),
        height: Math.abs(hei),
      }}
    ></div>
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
    <div 
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
