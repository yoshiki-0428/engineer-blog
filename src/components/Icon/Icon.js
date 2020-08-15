import React from 'react';
import "twin.macro";

const Icon = ({ name, icon }) => (
  <svg tw="inline-block w-2 h-2 stroke-0 stroke-current fill-current mx-1 text-center font-normal" viewBox={icon.viewBox}>
    <title>{name}</title>
    <path d={icon.path} />
  </svg>
);

export default Icon;
