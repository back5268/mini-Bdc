import { Option, Select } from '@material-tailwind/react';
import React from 'react';

export const Dropdownz = (props) => {
  const {
    id,
    value = '',
    onChange = () => {},
    size = 'lg',
    optionValue = 'key',
    optionLabel = 'label',
    options = [],
    className = '',
    selectClassName = '',
    ...prop
  } = props;

  return (
    <div className={`w-full md:w-6/12 lg:w-3/12 p-2 ${className}`}>
      <Select
        menuProps={{ className: 'p-0' }}
        id={id}
        value={value ? String(value) : ''}
        onChange={onChange}
        size={size}
        color="cyan"
        className={`rounded-md px-0 ${selectClassName}`}
        {...prop}
      >
        {options?.length > 0 ? (
          options.map((item, index) => {
            let key, label;
            if (typeof item === 'object') {
              key = String(item[optionValue]);
              label = String(item[optionLabel]);
            } else key = label = String(item);
            return (
              <Option key={index} value={key} className="my-1 py-3">
                {label}
              </Option>
            );
          })
        ) : (
          <div className="cursor-default">Không có dữ liệu</div>
        )}
      </Select>
    </div>
  );
};

export const DropdownForm = (props) => {
  const {
    emptyMessage = 'Không có dữ liệu',
    id,
    size = 'lg',
    optionValue = 'key',
    optionLabel = 'label',
    watch,
    setValue,
    errors = {},
    options = [],
    onChange,
    className = '',
    ...prop
  } = props;

  return (
    <div className={`flex flex-col gap-1 w-full lg:w-6/12 p-2 ${className}`}>
      <Select
        id={id}
        value={watch(id) ? String(watch(id)) : ''}
        onChange={(e) => (onChange ? onChange(e) : setValue(id, e))}
        size={size}
        color="cyan"
        error={Boolean(errors[id])}
        className="rounded-md px-0"
        {...prop}
      >
        {options?.length > 0 ? (
          options.map((item) => {
            let key, label;
            if (typeof item === 'object') {
              key = String(item[optionValue]);
              label = String(item[optionLabel]);
            } else key = label = String(item);
            return (
              <Option key={key} value={key}>
                {label}
              </Option>
            );
          })
        ) : (
          <div className="cursor-default">{emptyMessage}</div>
        )}
      </Select>
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};
