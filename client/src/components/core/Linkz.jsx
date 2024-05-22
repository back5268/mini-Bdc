import React from 'react';
import { Link } from 'react-router-dom';

const Linkz = (props) => {
  const { label, children, className, ...prop } = props;
  return <Link {...prop} className={`text-primary ${className}`}>{children || label}</Link>;
};

export default Linkz;
