'use client';
import React,{useState,useEffect} from 'react';
import { jwtDecode } from '@/helpers/jwt';
import axiosClient from '@/helpers/axios';
import Cookies from 'js-cookie';
export const SummaryDetails = () => {
const [summaryData, setSummaryData] = useState({
  totalMoneyAssured: 0,
  premiumPaid: 0,
  renewalDate: '',
  claimsAgainstYou: 0,
  claimsByYou: 0,
  totalReimbursed: 0,
});
  const token = Cookies.get('user')
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/transact/welcome', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummaryData(response.data);

    } catch (error) {

    }
  };

  fetchData();
}, []);
  const data = jwtDecode();
  const name = data?.owner;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col justify-between">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Welcome {name}</h2>
        <p className="text-lg mb-4 italic">
          "Empowering your business with trust and safety in every transaction."
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 mt-auto">
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
