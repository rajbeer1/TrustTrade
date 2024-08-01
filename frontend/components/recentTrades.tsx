'use client'
import React, { useState, useEffect } from 'react';
import axiosClient from '@/helpers/axios';
import Cookies from 'js-cookie';
import NoTransactionData from './notransaction';
export const RecentTrades = () => {
  const dummyBuyerData = [
    {
      id: 1,
      sellerName: 'Dummy Seller 1',
      status: 'COMPLETE',
      date: '2023-07-01',
      amount: 1000,
    },
    {
      id: 2,
      sellerName: 'Dummy Seller 2',
      status: 'PENDING',
      date: '2023-07-02',
      amount: 2000,
    },
  ];

  const dummySellerData = [
    {
      id: 3,
      sellerName: 'Dummy Buyer 1',
      status: 'COMPLETE',
      date: '2023-07-03',
      amount: 1500,
    },
    {
      id: 4,
      sellerName: 'Dummy Buyer 2',
      status: 'FAILED',
      date: '2023-07-04',
      amount: 2500,
    },
  ];
  const [buyerTransactions, setbuyerdata] = useState(dummyBuyerData);
  const [sellerTransactions, setsellerdata] = useState(dummySellerData);
 const getdata = async () => {
   const buyerdata = await axiosClient.get('/transact/buyer', {
     headers: { Authorization: `Bearer ${Cookies.get('user')}` },
   });
   setbuyerdata(buyerdata.data);
   const sellerdata = await axiosClient.get('/transact/seller', {
     headers: { Authorization: `Bearer ${Cookies.get('user')}` },
   });
   setsellerdata(sellerdata.data);
 };
 useEffect(() => {
   getdata();
 }, []);
  
  const TransactionList = ({ title, transactions }:any) => (
    <div className="bg-white rounded-lg shadow-md  p-4 h-96 flex flex-col">
      <h2 className="text-lg font-semibold mb-2 text-indigo-700">{title}</h2>
      <ul className="space-y-2 flex-grow overflow-auto">
        {transactions.map((transaction:any) => (
          <li
            key={transaction.id}
            className="bg-white p-3 rounded-md hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">
                {transaction.sellerName}
              </span>
              <span
                className={`text-sm font-semibold ${
                  transaction.status === 'COMPLETE'
                    ? 'text-green-600'
                    : transaction.status === 'PENDING'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {transaction.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">{transaction.date}</div>
            <div className="text-right mt-2 font-bold text-indigo-600">
              ₹{transaction.amount.toFixed(0)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  console.log(buyerTransactions)
  if (buyerTransactions.length<2&&sellerTransactions.length<2) {
  return <NoTransactionData/>
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white">
      { buyerTransactions.length>=2 ?
        <TransactionList
          title="Buyer Transactions"
          transactions={buyerTransactions}
        /> : <NoTransactionData/>}
      {sellerTransactions.length >= 2 ?
        <TransactionList
          title="Seller Transactions"
          transactions={sellerTransactions}
        /> : <NoTransactionData/>}
    </div>
  );
};
