'use client';
import React, { useState, useEffect } from 'react';
import axiosClient from '@/helpers/axios';
interface Buyer {
  business_name: string;
  email: string;
}
interface Seller {
  business_name: string;
  email: string;
}
interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: string;
  buyer: Buyer;
  seller: Seller;
}
interface TransactionListProps {
  userEmail: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ userEmail }) => {
  const dummyTransactions: Transaction[] = [
    {
      id: '1',
      date: '2023-07-01T10:00:00Z',
      amount: 1000,
      status: 'PENDING',
      buyer: {
        business_name: 'Dummy Buyer 1',
        email: 'dummybuyer1@example.com',
      },
      seller: {
        business_name: 'Dummy Seller 1',
        email: 'dummyseller1@example.com',
      },
    },
    {
      id: '2',
      date: '2023-07-02T11:00:00Z',
      amount: 2000,
      status: 'COMPLETE',
      buyer: {
        business_name: 'Dummy Buyer 2',
        email: 'dummybuyer2@example.com',
      },
      seller: {
        business_name: 'Dummy Seller 2',
        email: 'dummyseller2@example.com',
      },
    },
    {
      id: '3',
      date: '2023-07-03T12:00:00Z',
      amount: 1500,
      status: 'ISSUE',
      buyer: {
        business_name: 'Dummy Buyer 3',
        email: 'dummybuyer3@example.com',
      },
      seller: {
        business_name: 'Dummy Seller 3',
        email: 'dummyseller3@example.com',
      },
    },
  ];
  const [transactions, setTransactions] = useState<Transaction[]>(dummyTransactions);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient.get(`/transact/transactions/${userEmail}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [userEmail]);

  const handleClaim = async (transactionId: string, claimType: 'buyer' | 'seller') => {
    try {
      await axiosClient.post('/transact/makeclaim', {
        transactionId,
        userEmail,
        claimType,
      });
      // Refresh transactions after claim
      const response = await axiosClient.get(`/transact/transactions/${userEmail}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error making claim:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 w-4/5 overflow-auto">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 mt-6">
        Transactions
      </h1>
      <div className="max-w-6xl mx-auto flex  flex-wrap">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white shadow-lg  grid rounded-lg overflow-hidden mb-4 p-4 w-full sm:w-1/2 sm:pr-2"
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2">
              <h2 className="text-lg font-semibold text-white">
                Transaction ID: {transaction.id.slice(0, 6)}
              </h2>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`px-2 py-1 rounded ${
                    transaction.status === 'PENDING'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
              <p>Date: {new Date(transaction.date).toLocaleString()}</p>
              <p>Amount: ₹{transaction.amount.toLocaleString()}</p>
              <p>Buyer: {transaction.buyer.business_name}</p>
              <p>Seller: {transaction.seller.business_name}</p>
              <div className="mt-4 flex justify-end space-x-2">
                {transaction.buyer.email === userEmail && (
                  <button
                    onClick={() => handleClaim(transaction.id, 'buyer')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Claim as Buyer
                  </button>
                )}
                {transaction.seller.email === userEmail && (
                  <button
                    onClick={() => handleClaim(transaction.id, 'seller')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Claim as Seller
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
