import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { ListItem } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = (props) => {
  const { children, item = {}, pathname = '', className = '', ...prop } = props;
  const Item = item.icon;
  const isSelected =
    item.type === 'item' ? (pathname === '/admin' ? item.route === '' : '/' + pathname.toString().split('/')[2] === item.route) : false;

  const Fragment = ({ children }) => {
    if (item.type === 'item') {
      const route = '/admin' + item.route;
      return <Link to={route}>{children}</Link>;
    } else return <>{children}</>;
  };

  return (
    <Fragment>
      <ListItem
        {...prop}
        className={`transition-all duration-500 ease-in-out hover:text-on-sidebar p-2 !text-on-sidebar ${className} 
        ${isSelected ? 'bg-primary hover:bg-primary focus:bg-primary active:bg-primary' : 'hover:bg-hover-sidebar focus:bg-hover-sidebar active:bg-hover-sidebar'}`}
      >
        {children ? (
          children
        ) : (
          <>
            <div className="grid place-items-center mr-4">
              {item.icon ? <Item className="h-5 w-5" /> : <ChevronRightIcon strokeWidth={4} className="h-3 w-5" />}
            </div>
            <span className="block antialiased text-sm leading-6 text-inherit mr-auto font-normal">{item.label}</span>
          </>
        )}
      </ListItem>
    </Fragment>
  );
};

export default NavItem;
