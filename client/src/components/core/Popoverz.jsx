import { Popover, PopoverHandler, PopoverContent, Button } from '@material-tailwind/react';

const Popoverz = (props) => {
  const {
    header,
    children,
    animate = {
      mount: { scale: 1, x: 0, y: 10 },
      unmount: { scale: 0, x: 105, y: -120 }
    },
    placement = 'top-start',
    className,
    ...prop
  } = props;

  return (
    <Popover
      placement={placement}
      animate={animate}
      {...prop}
    >
      <PopoverHandler>
        <Button color="white" className={className}>{header}</Button>
      </PopoverHandler>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
};

export default Popoverz;
