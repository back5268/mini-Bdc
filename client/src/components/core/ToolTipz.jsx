import { Tooltip } from '@material-tailwind/react';
import React from 'react';

const ToolTipz = (props) => {
  const { content, children, ...prop } = props;
  return (
    <Tooltip content={content} {...prop}>
      {children}
    </Tooltip>
  );
};

export default ToolTipz;
