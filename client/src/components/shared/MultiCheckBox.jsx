import { CheckBoxz } from '@components/core';
import { List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import React, { useState } from 'react';

const MultiCheckBox = (props) => {
  const {
    label,
    id,
    options = [],
    value = [],
    setValue = () => {},
    optionValue = 'key',
    optionLabel = 'label',
    className = '',
    ...prop
  } = props;
  const [selectAll, setSelectAll] = useState(false);

  return (
    <List className={`flex-row w-full text-sm flex justify-between ${className}`}>
      <div>
        <ListItem className="p-0">
          <label htmlFor={id} className="flex cursor-pointer items-center px-3 py-2 font-medium">
            <ListItemPrefix className="mr-3">
              <CheckBoxz
                id={id}
                ripple={false}
                checked={selectAll}
                onChange={() => {
                  if (selectAll) {
                    setValue((pre) =>
                      pre.filter((p) => {
                        const route = p.split('---')?.[0];
                        if (route === id) return false;
                        else return true;
                      })
                    );
                  } else {
                    const newValue = options.map((o) => o.key);
                    value.forEach((v) => {
                      if (!newValue.includes(v)) newValue.push(v);
                    });
                    setValue(newValue);
                  }
                  setSelectAll(!selectAll);
                }}
                className="hover:before:opacity-0"
                containerProps={{
                  className: 'p-0'
                }}
                {...prop}
              />
            </ListItemPrefix>
            {label}
          </label>
        </ListItem>
      </div>
      <div className="flex gap-2">
        {options.map((item) => {
          let key, text;
          if (typeof item === 'object') {
            key = item[optionValue];
            text = item[optionLabel];
          } else key = text = item;

          return (
            <ListItem key={key} className="p-0 min-w-32">
              <label htmlFor={key} className="flex w-full cursor-pointer items-center px-3 py-2">
                <ListItemPrefix className="mr-3">
                  <CheckBoxz
                    id={key}
                    ripple={false}
                    checked={value.includes(key)}
                    onChange={() => {
                      let newValue = [];
                      if (value.includes(key)) newValue = value.filter((v) => v !== key);
                      else newValue = [...value, key];
                      const arrCheck = newValue.filter((v) => {
                        const route = v.split('---')?.[0];
                        if (route === id) return true;
                        else return false;
                      });
                      if (arrCheck?.length === options.length) setSelectAll(true);
                      else setSelectAll(false);
                      setValue(newValue)
                    }}
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
      </div>
    </List>
  );
};

export default MultiCheckBox;
