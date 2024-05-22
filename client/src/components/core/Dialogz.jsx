import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Buttonz, Hrz } from '.';

const Dialogz = (props) => {
  const { title, children, open, setOpen, position = "center", className = '', z = 20 } = props;

  return (
    <>
      <div
        className={`z-[70] fixed inset-x-0 inset-y-0 duration-600 ease-in-out transform w-full h-full bg-black bg-opacity-50 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      ></div>
      <div
        className={`fixed inset-x-0 inset-y-0 w-screen h-screen z-[70] flex justify-center ${position === "center" ? "items-center" : "items-start pt-12"} p-6 ${open ? '' : 'pointer-events-none'}`}
      >
        <div
          className={`relative min-h-40 bg-white shadow-xl rounded-xl transition-all z-[71] p-6 ${className}
          duration-300 ease-in-out transform ${open ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'}`}
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold uppercase leading-normal">{title}</h2>
            <Buttonz onClick={() => setOpen(false)} color="gray" variant="text" className="p-1 rounded-full mb-2">
              <XMarkIcon className="h-8 w-8 stroke-4" />
            </Buttonz>
          </div>
          <Hrz />
          {children}
        </div>
      </div>
    </>
  );
};

export default Dialogz;
