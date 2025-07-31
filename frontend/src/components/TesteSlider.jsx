// components/TesteSlider.jsx
import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function TesteSlider() {
  const [value, setValue] = React.useState([20, 80]);

  return (
    <div style={{ padding: '50px', backgroundColor: 'black' }}>
      <h2 style={{ color: 'white' }}>Testando RC-Slider</h2>
      <Range
        min={0}
        max={100}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}