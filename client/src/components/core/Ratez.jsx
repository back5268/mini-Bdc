import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconz } from '@heroicons/react/24/solid';

const Ratez = ({ value = 5, className = '', w = '4' }) => {
  const data = Array.from({ length: 5 }, (_, index) => Math.floor(value) - index - 1);

  return (
    <div className={`flex gap-2 ${className}`}>
      {data.map((datum, index) => {
        if (datum < 0) return <StarIcon key={index} color="red" className={`w-${w}`} />;
        else return <StarIconz key={index} color="red" className={`w-${w}`} />;
      })}
    </div>
  );
};

export default Ratez;
