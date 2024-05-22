import React from 'react';

const Hrz = (props) => {
  const { className = "", ...prop } = props;
  return <hr className={`border-blue-gray-200 ${className}`} {...prop} />
};

export default Hrz;
