import { Textarea } from '@material-tailwind/react';
import React from 'react';

const TextAreaz = (props) => {
  const { id, size = 'lg', color = 'cyan', value, setValue = () => {}, className = '', ...prop } = props;

  return (
    <div className={`flex flex-col gap-1 w-full p-2 ${className}`}>
      <Textarea id={id} value={value} onChange={(e) => setValue(e.target.value)} color={color} autoComplete={id} size={size} {...prop} />
    </div>
  );
};

export default TextAreaz;
