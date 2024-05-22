import { Spinnerz } from '@components/core';
import React from 'react';

const Loading = (props) => {
  const { size = 8, border = 4, color = "gray", className = "", ...prop } = props;
  return (
    <div className={`absolute w-full h-full bg-black opacity-30 z-10 flex justify-center items-center ${className}`}>
      <Spinnerz size={size} border={border} color={color} {...prop} />
    </div>
  );
};

export default Loading;
