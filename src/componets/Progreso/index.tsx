import React from 'react'
import "./style.scss";

interface ProgresoProps {
  avance: number
  color?:string
}

const Progreso: React.FC<ProgresoProps> = (props: ProgresoProps) => {
  return (
    <div className="progress-bar" style={{ border: `solid 1px  ${props?.color || '#c1c1c1'}` }}>
      <div className="progress-bar__filler" style={{ width: `${props?.avance}%`, backgroundColor:` ${props?.color || '#76c7c0'}` }}>
        &nbsp;
      </div>
    </div>
  );
}


export default Progreso;