import React from 'react';
import { FaSadTear } from 'react-icons/fa'; // Using react-icons for a cute icon

const NoTransactionData = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col justify-center items-center text-center">
      <FaSadTear className="text-blue-500 text-6xl mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No Transactions Yet!</h2>
      <p className="text-sm text-gray-500 mb-6">
        Execute transactions to see your summary.
      </p>
     
    </div>
  );
};

export default NoTransactionData;
