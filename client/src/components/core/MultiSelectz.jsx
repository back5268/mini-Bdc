import { Option, Select } from '@material-tailwind/react';

const MultiSelectz = (props) => {
  const {
    id,
    value = [],
    setValue = () => {},
    size = 'lg',
    optionValue = 'key',
    optionLabel = 'label',
    options = [],
    className = '',
    ...prop
  } = props;

  return (
    <div className={`w-full p-2 ${className}`}>
      <Select
        id={id}
        value={String(value)}
        onChange={(e) => {
          if (e === 'all') {
            if (value.includes('all')) setValue([]);
            else
              setValue([
                ...options.map((o) => {
                  let key;
                  if (typeof o === 'object') {
                    key = String(o[optionValue]);
                  } else key = String(o);
                  return key;
                }),
                'all'
              ]);
          } else {
            if (value.includes(e)) setValue(value.filter((v) => v !== e && v !== 'all'));
            else {
              const newValue = [...value, e];
              if (newValue.length === options.length) setValue([...newValue, 'all']);
              else setValue([...newValue]);
            }
          }
        }}
        size={size}
        color="cyan"
        className="rounded-md px-0"
        {...prop}
      >
        {options?.length > 0 ? (
          <>
            <Option value="all" className={value.includes('all') ? 'bg-blue-gray-50' : 'bg-white'}>
              Chọn tất cả
            </Option>
            {options.map((item) => {
              let key, label;
              if (typeof item === 'object') {
                key = String(item[optionValue]);
                label = String(item[optionLabel]);
              } else key = label = String(item);
              const active = value.includes(key);

              return (
                <Option key={key} value={key} className={active ? 'bg-blue-gray-50 my-1' : 'bg-white my-1'}>
                  {label}
                </Option>
              );
            })}
          </>
        ) : (
          <div className="cursor-default">Không có dữ liệu</div>
        )}
      </Select>
    </div>
  );
};

export default MultiSelectz;
