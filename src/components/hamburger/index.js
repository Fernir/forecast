import React from 'react';
import cn from 'classnames';

import './hamburger.scss';

export const Hamburger = ({open, size = 20, onClick, color = '#000000'}) => (
  <div className="hamburger" onClick={onClick}>
    <svg viewBox="0 0 100 100" fill={color} width={size} height={size}>
      <path className={cn('line line-1', {'line-1--opened': open})} d="M5 13h90v14H5z"/>
      <path className={cn('line line-2', {'line-2--opened': open})} d="M5 43h90v14H5z"/>
      <path className={cn('line line-3', {'line-3--opened': open})} d="M5 73h90v14H5z"/>
    </svg>
  </div>
);

