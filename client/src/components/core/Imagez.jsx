import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Dialogz } from '.';

const Imagez = (props) => {
  const { className = 'h-10 w-10', bg, isZoom, ...prop } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative rounded-md ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {isZoom && (
        <Dialogz open={open} setOpen={setOpen} className="w-[1000px]">
          <div className="h-full w-full flex justify-center">
            <img className={`rounded-md object-cover object-center`} {...prop} />
          </div>
        </Dialogz>
      )}
      <img className={`rounded-md object-cover object-center ${className}`} {...prop} />
      {isZoom && (
        <div className={`absolute cursor-pointer rounded-md inset-0 justify-center items-center group-hover:flex flex`}>
          {isHovered && <div className="absolute rounded-md inset-0 bg-black bg-opacity-50 opacity-50"></div>}
          <div
            className={`font-medium z-10 duration-300 ease-in-out transform 
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <EyeIcon onClick={() => setOpen(true)} className="w-8 h-8 text-white stroke-2" />
          </div>
        </div>
      )}
      {bg && <span className="absolute top-0 left-0 w-full h-full bg-primary opacity-15"></span>}
    </div>
  );
};

export default Imagez;
