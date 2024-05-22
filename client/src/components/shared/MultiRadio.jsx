import { Radioz } from '@components/core';
import { List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import React from 'react';

const MultiRadio = (props) => {
  const {
    label,
    id,
    options = [],
    value,
    setValue = () => {},
    optionValue = 'key',
    optionLabel = 'label',
    className = '',
    ...prop
  } = props;

  return (
    <List className={`flex-row w-full ${className}`}>
      <label className="flex w-full items-center py-2 font-medium">{label}</label>
      {options.map((item, index) => {
        let key, text;
        if (typeof item === 'object') {
          key = item[optionValue];
          text = item[optionLabel];
        } else key = text = item;

        return (
          <ListItem key={index} className="p-0">
            <label htmlFor={key} className="flex w-full cursor-pointer items-center px-3 py-2">
              <ListItemPrefix className="mr-3">
                <Radioz
                  checked={value === key}
                  onChange={() => setValue(key)}
                  name={id}
                  id={key}
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: 'p-0'
                  }}
                  {...prop}
                />
              </ListItemPrefix>
              {text}
            </label>
          </ListItem>
        );
      })}
    </List>
  );
};

export default MultiRadio;
