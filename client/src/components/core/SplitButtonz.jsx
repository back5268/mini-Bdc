import React, { useEffect, useRef, useState } from 'react';
import { Buttonz } from '.';
import { ListItem } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const SplitButtonz = (props) => {
  const { label = 'Tác vụ', items = [] } = props;
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <Buttonz onClick={() => setOpen(!open)} className="flex gap-8 items-center">
        <span>{label}</span>
        <ChevronDownIcon className={`duration-300 ease-in-out transform w-4 h-4 stroke-2 ${open ? 'rotate-180' : ''}`} />
      </Buttonz>
      <div
        className={`absolute bg-white top-12 left-0 z-10 shadow-md min-w-[12rem] rounded-md duration-300 
      ease-in-out transform ${open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
            >
              <ListItem>
                {Icon && (
                  <div className="grid place-items-center mr-4">
                    {Icon ? <Icon className="h-5 w-5" /> : <ChevronRightIcon strokeWidth={4} className="h-3 w-5" />}
                  </div>
                )}
                <span className="block antialiased text-sm leading-6 text-inherit mr-auto font-normal text-nowrap">{item.label}</span>
              </ListItem>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SplitButtonz;
