'use client'
import React from 'react';
import { jwtDecode } from '@/helpers/jwt';
import { Button } from './ui/button';
import Link from 'next/link';

export const SummaryDetails = () => {
  const summaryData = {
    totalMoneyAssured: 10000000,
    premiumPaid: 750000,
    renewalDate: '2024-12-31',
    claimsAgainstYou: 5,
    claimsByYou: 8,
    totalReimbursed: 500000,
  };

  const data = jwtDecode();
  const name = data?.owner;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col justify-between">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Welcome {name}</h2>
        <p className="text-lg mb-4 italic">
          "Empowering your business with trust and safety in every transaction."
        </p>
      </div>

      {/* Summary Section */}
      <div className="bg-gray-100 rounded-lg p-4 mt-auto">
        {/* <h3 className="text-lg font-semibold mb-4">Summary</h3> */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-lg">
              Money Assured:
              <span className="font-bold ml-2 text-indigo-600">
                ₹{summaryData.totalMoneyAssured.toLocaleString()}
              </span>
            </p>
            <p className="text-lg">
              Premium Paid:
              <span className="font-bold ml-2 text-indigo-600">
                ₹{summaryData.premiumPaid.toLocaleString()}
              </span>
            </p>
            <p className="text-lg">
              Total Reimbursed:
              <span className="font-bold ml-2 text-indigo-600">
                ₹{summaryData.totalReimbursed.toLocaleString()}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-lg">
              Claims Against You:
              <span className="font-bold ml-2">
                {summaryData.claimsAgainstYou}
              </span>
            </p>
            <p className="text-lg">
              Claims By You:
              <span className="font-bold ml-2">{summaryData.claimsByYou}</span>
            </p>

            <p className="text-lg">
              Renewal Date:
              <span className="font-bold ml-2">{summaryData.renewalDate}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


