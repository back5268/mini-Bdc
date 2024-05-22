import { Card, CardBody, CardFooter, CardHeader } from '@material-tailwind/react';
import React from 'react';

const Cardz = (props) => {
  const { children, footer, header, className = '' } = props;
  return (
    <Card className={`text-color transition-all duration-500 ease-in-out ${className}`}>
      {header && (  
        <CardHeader color="blue-gray" className="relative h-56">
          {header}
        </CardHeader>
      )}
      <CardBody className='p-2'>{children}</CardBody>
      {footer && <CardFooter className="pt-0">{footer}</CardFooter>}
    </Card>
  );
};

export default Cardz;
