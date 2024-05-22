import { Input, Popover, PopoverHandler, PopoverContent } from '@material-tailwind/react';
import { DayPicker } from 'react-day-picker';
import React from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import moment from 'moment/moment';

export const InputCalendarz = (props) => {
  const { value, onChange = () => {}, className = '', ...prop } = props;

  return (
    <div className={`w-full md:w-6/12 lg:w-3/12 p-2 ${className}`}>
      <DatePickerz date={value} setDate={onChange} {...prop} />
    </div>
  );
};

export const InputCalendarForm = (props) => {
  const { id, errors = {}, watch, setValue, className = '', ...prop } = props;

  return (
    <div className={`flex flex-col gap-1 w-full lg:w-6/12 p-2 ${className}`}>
      <DatePickerz id={id} date={watch(id)} setDate={(e) => setValue(id, e)} error={Boolean(errors[id])} {...prop} />
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};

const DatePickerz = (props) => {
  const { id, label = 'Chọn ngày', size = 'lg', color = 'cyan', error, date, setDate = () => {}, format = 'DD/MM/YYYY', ...prop } = props;

  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <Input
          id={id}
          label={label}
          size={size}
          color={color}
          onChange={() => null}
          value={date ? moment(date).format(format) : ''}
          error={error}
        />
      </PopoverHandler>
      <PopoverContent className="z-[999]">
        <DayPicker
          {...prop}
          mode="single"
          selected={date}
          onSelect={setDate}
          showOutsideDays
          className="border-0"
          classNames={{
            caption: 'flex justify-center py-2 mb-4 relative items-center',
            caption_label: 'text-sm font-medium text-gray-900',
            nav: 'flex items-center',
            nav_button: 'h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
            nav_button_previous: 'absolute left-1.5',
            nav_button_next: 'absolute right-1.5',
            table: 'w-full border-collapse',
            head_row: 'flex font-medium text-gray-900',
            head_cell: 'm-0.5 w-9 font-normal text-sm',
            row: 'flex w-full mt-2',
            cell: 'text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
            day: 'h-9 w-9 p-0 font-normal',
            day_range_end: 'day-range-end',
            day_selected: 'rounded-md bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white',
            day_today: 'rounded-md bg-gray-200 text-gray-900',
            day_outside:
              'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
            day_disabled: 'text-gray-500 opacity-50',
            day_hidden: 'invisible'
          }}
          components={{
            IconLeft: ({ ...props }) => <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />,
            IconRight: ({ ...props }) => <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
