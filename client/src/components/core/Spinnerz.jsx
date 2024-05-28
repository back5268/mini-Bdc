import { Spinner } from '@material-tailwind/react';
import React from 'react';

const Spinnerz = (props) => {
  const { size = 8, border = 4, color = "blue", className = "", ...prop } = props;
  return <Spinner color={color} className={`h-8 w-8 stroke-2 ${className}`} {...prop} />;
};

export default Spinnerz;
