import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import React from 'react';
import NavItem from './NavItem';

const NavGroup = (props) => {
  const { value, item = {}, open, setOpen, pathname, Icon } = props;
  const isOpen = value === open;

  return (
    <Accordion
      open={isOpen}
      icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
    >
      <NavItem className={isOpen ? 'bg-hover-sidebar' : ''}>
        <AccordionHeader
          onClick={() => setOpen(open === value ? 0 : value)}
          className="border-b-0 p-0 text-on-sidebar hover:text-on-sidebar"
        >
          <div className="grid place-items-center mr-4">
            <Icon className="h-5 w-5" />
          </div>
          <span className="block antialiased text-sm leading-6 text-inherit mr-auto font-normal">{item.name}</span>
        </AccordionHeader>
      </NavItem>
      <AccordionBody className="py-1 text-on-sidebar">
        <nav className="flex flex-col gap-1 font-normal p-0">
          {item?.children?.map((child, index) => {
            return <NavItem key={index} item={child} pathname={pathname} />;
          })}
        </nav>
      </AccordionBody>
    </Accordion>
  );
};

export default NavGroup;
