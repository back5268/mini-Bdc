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
        value={(value || value === 0) ? String(value) : ''}
        onChange={onChange}
        size={size}
        color="cyan"
        className={`rounded-md px-0 ${selectClassName}`}
        selected={() => {
          const option = options.find((o) => String(o[optionValue] || o) === String(value));
          const text = option?.[optionLabel] || option;
          return <div className="w-full flex gap-2 overflow-hidden">{text}</div>;
        }}
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
              <Option key={index} value={key} className="py-3">
                {label}
              </Option>
            );
          })
        ) : (
          <div className="cursor-default p-3">Không có dữ liệu</div>
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
        menuProps={{ className: 'p-0' }}
        id={id}
        value={(watch(id) || watch(id) === 0) ? String(watch(id)) : ''}
        onChange={(e) => (onChange ? onChange(e) : setValue(id, e))}
        size={size}
        color="cyan"
        error={Boolean(errors[id])}
        selected={() => {
          const option = options.find((o) => String(o[optionValue] || o) === String(watch(id)));
          const text = option?.[optionLabel] || option;
          return <div className="w-full flex gap-2 overflow-hidden">{text}</div>;
        }}
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
              <Option key={key} value={key} className="py-3">
                {label}
              </Option>
            );
          })
        ) : (
          <div className="cursor-default p-3">{emptyMessage}</div>
        )}
      </Select>
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};
