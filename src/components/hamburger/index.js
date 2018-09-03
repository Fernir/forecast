import React from 'react';

import './hamburger.scss';

export const Hamburger = ({open, size = 30, onClick, color = '#000000'}) => (
  <div className="hamburger" onClick={onClick}>
    <svg viewBox={`0 0 ${size} ${size}`} strokeWidth={size / 10} stroke={color} strokeLinecap="round" width={size} height={size}>
      <line x1={size / 10} y1={size / 10} x2={size - (size / 10)} y2={open ? size - (size / 10) : size / 10}/>
      <line stroke={open ? 'rgba(0,0,0,0)' : '#000'} x1={size / 10} y1={size / 2} x2={size - size / 10} y2={size / 2}/>
      <line x1={size / 10} y1={size - (size / 10)} x2={size - (size / 10)} y2={open ? size / 10 : size - (size / 10)}/>
    </svg>
  </div>
);
