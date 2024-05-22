import { Input } from '@material-tailwind/react';
import React from 'react';

export const Inputz = (props) => {
  const { id, value = '', onChange = () => {}, size = 'lg', color = 'cyan', classInput = '', className = '', ...prop } = props;

  return (
    <div className={`w-full md:w-6/12 lg:w-3/12 p-2 ${className}`}>
      <Input color={color} autoComplete={id} size={size} id={id} value={value} onChange={onChange} className={classInput} {...prop} />
    </div>
  );
};

export const InputForm = (props) => {
  const { id, size = 'lg', color = 'cyan', errors = {}, register = () => {}, className = '', ...prop } = props;

  return (
    <div className={`flex flex-col gap-1 w-full lg:w-6/12 p-2 ${className}`}>
      <Input color={color} autoComplete={id} size={size} id={id} error={Boolean(errors[id])} {...register(id)} {...prop} />
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};
