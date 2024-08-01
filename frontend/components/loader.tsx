import React from 'react';

const Loader = () => {
  return (
    <div className=" w-4/5 flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
};

export default Loader;
