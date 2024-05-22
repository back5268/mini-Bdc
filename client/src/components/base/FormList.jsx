import { Cardz, Hrz } from '@components/core';
import React from 'react';

const FormList = (props) => {
  const { title, children } = props;

  return (
    <Cardz className="p-4">
      <h2 className="font-semibold uppercase leading-normal mb-2">{title}</h2>
      <Hrz />
      {children}
    </Cardz>
  );
};

export default FormList;
