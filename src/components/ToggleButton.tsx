import React from 'react';
import './Toggle.css'

const ToggleButton = ({onChange, checked}) => {
  return (
    <div className="button b2" id="button-16">
      <input type="checkbox" className="checkbox" onChange={onChange} checked={checked} />
      <div className="knobs">
        <span></span>
      </div>
      <div className="layer"></div>
    </div>
  );
};

export default ToggleButton;