import { Spinner } from '@material-tailwind/react';
import React from 'react';

const Spinnerz = (props) => {
  const { size = 4, border = 4, color = "blue", className = "", ...prop } = props;
  return <Spinner color={color} className={`h-${size} w-${size} border-${border} ${className}`} {...prop} />;
};

export default Spinnerz;
