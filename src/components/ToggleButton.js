import React from 'react';
import './Toggle.css'

const ToggleButton = () => {
  return (
    <div class="button b2" id="button-16">
      <input type="checkbox" class="checkbox" />
      <div class="knobs">
        <span></span>
      </div>
      <div class="layer"></div>
    </div>
  );
};

export default ToggleButton;