import { ListItem, Select } from '@material-tailwind/react';
import { CheckBoxz, Chipz } from '.';

export const MultiSelectz = (props) => {
  const {
    id,
    emptyMessage = 'Không có dữ liệu',
    value = [],
    onChange = () => {},
    size = 'lg',
    optionValue = 'key',
    optionLabel = 'label',
    options = [],
    className = '',
    ...prop
  } = props;
  const isSelectAll = value?.length > 0 && value?.length === options.length;

  return (
    <div className={`w-full md:w-6/12 lg:w-3/12 p-2 ${className}`}>
      <Select
        id={id}
        value={String(value)}
        size={size}
        color="cyan"
        className="rounded-md px-0"
        onChange={() => {}}
        selected={() => {
          return (
            <div className="w-full flex gap-2 overflow-hidden">
              {value?.map((v, index) => {
                const text = options.find((o) => o[optionValue] === v)?.[optionLabel];
                return text && <Chipz key={index} color="blue-gray" value={text} />;
              })}
            </div>
          );
        }}
        {...prop}
      >
        {options?.length > 0 ? (
          <>
            <ListItem
              onClick={() => (isSelectAll ? onChange([]) : onChange(options.map((o) => o[optionValue])))}
              className={`!py-1 my-1 ${isSelectAll ? 'bg-blue-gray-50' : 'bg-white'}`}
            >
              <div className="w-full flex gap-2 items-center">
                <CheckBoxz checked={isSelectAll} onChange={() => {}} /> Chọn tất cả
              </div>
            </ListItem>
            {options.map((item) => {
              let key, label;
              if (typeof item === 'object') {
                key = String(item[optionValue]);
                label = String(item[optionLabel]);
              } else key = label = String(item);
              const active = value.includes(key);

              return (
                <ListItem
                  key={key}
                  onClick={() => (active ? onChange(value.filter((p) => p !== key)) : onChange([...value, key]))}
                  className={`!py-1 ${active ? 'bg-blue-gray-50 my-1' : 'bg-white my-1'}`}
                >
                  <div className="w-full flex gap-2 items-center">
                    <CheckBoxz checked={active} onChange={() => {}} /> {label}
                  </div>
                </ListItem>
              );
            })}
          </>
        ) : (
          <div className="cursor-default">{emptyMessage}</div>
        )}
      </Select>
    </div>
  );
};

export const MultiSelectForm = (props) => {
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
    className = '',
    onChange: onChangez,
    ...prop
  } = props;
  const value = watch(id) || [];
  const onChange = onChangez ? onChangez : (e) => setValue(id, e);
  const isSelectAll = value?.length > 0 && value?.length === options.length;

  return (
    <div className={`flex flex-col gap-1 w-full lg:w-6/12 p-2 ${className}`}>
      <Select
        id={id}
        value={String(value)}
        size={size}
        color="cyan"
        className="rounded-md px-0"
        onChange={() => {}}
        selected={() => {
          return (
            <div className="w-full flex gap-2 overflow-hidden">
              {value?.map((v, index) => {
                const text = options.find((o) => o[optionValue] === v)?.[optionLabel];
                return text && <Chipz key={index} color="blue-gray" value={text} />;
              })}
            </div>
          );
        }}
        {...prop}
      >
        {options?.length > 0 ? (
          <>
            <ListItem
              onClick={() => (isSelectAll ? onChange([]) : onChange(options.map((o) => o[optionValue])))}
              className={`!py-1 my-1 ${isSelectAll ? 'bg-blue-gray-50' : 'bg-white'}`}
            >
              <div className="w-full flex gap-2 items-center">
                <CheckBoxz checked={isSelectAll} onChange={() => {}} /> Chọn tất cả
              </div>
            </ListItem>
            {options.map((item) => {
              let key, label;
              if (typeof item === 'object') {
                key = String(item[optionValue]);
                label = String(item[optionLabel]);
              } else key = label = String(item);
              const active = value.includes(key);

              return (
                <ListItem
                  key={key}
                  onClick={() => (active ? onChange(value.filter((p) => p !== key)) : onChange([...value, key]))}
                  className={`!py-1 ${active ? 'bg-blue-gray-50 my-1' : 'bg-white my-1'}`}
                >
                  <div className="w-full flex gap-2 items-center">
                    <CheckBoxz checked={active} onChange={() => {}} /> {label}
                  </div>
                </ListItem>
              );
            })}
          </>
        ) : (
          <div className="cursor-default">{emptyMessage}</div>
        )}
      </Select>
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};
