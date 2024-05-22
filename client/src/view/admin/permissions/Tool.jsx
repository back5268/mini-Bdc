import { MultiCheckBox } from '@components/shared';
import { toolActions } from '@constant';
import React from 'react';

const Tool = (props) => {
  const { value = [], setValue = () => {}, tool = {} } = props;
  const children = tool?.children;

  return (
    <div>
      {children?.map((child, index) => {
        return (
          <MultiCheckBox
            key={index}
            id={child.route}
            label={child?.name}
            value={value}
            setValue={setValue}
            options={child.actions?.map((a) => {
              const label = toolActions.find((t) => t.key === a)?.label;
              return { label, key: `${child.route}---${a}` };
            })}
          />
        );
      })}
    </div>
  );
};

export default Tool;
