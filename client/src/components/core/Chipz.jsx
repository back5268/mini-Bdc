import { Chip } from '@material-tailwind/react';
import React from 'react';

const Chipz = (props) => {
  const { label, color = "cyan", ...prop } = props;
  return <Chip color={color} value={label} {...prop} />;
};

export default Chipz;
