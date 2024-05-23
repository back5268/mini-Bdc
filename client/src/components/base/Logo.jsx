import React from 'react';

const Logo = (props) => {
  const { className = '', classNameImg = "h-10" } = props;

  return (
    <div className={`flex gap-4 justify-center items-center font-bold text-2xl ${className}`}>
      <div className={classNameImg}>
        <img src="/images/logo.png" alt="Logo" className={classNameImg} />
      </div>
      <span>Mini BDC</span>
    </div>
  );
};

export default Logo;
