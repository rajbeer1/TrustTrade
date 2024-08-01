'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import debounce from 'lodash.debounce';
import axiosClient from '@/helpers/axios';
import { Button } from '@/components/ui/button';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@/components/uploadthing';
import { FaFilePdf, FaSearch, FaSpinner } from 'react-icons/fa';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    maxHeight: '60vh',
    overflowY: 'auto' as 'auto',
  },
};

interface Business {
  id: string;
  business_name: string;
  promoter_name: string;
  sumAssured: number;
  safetyRating: number;
}

interface PendingTransaction {
  id: string;
  business_name: string;
  amount: number;
  date: string;
  invoice?: string;
}

export default function BusinessSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Business[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [transactionAmount, setTransactionAmount] = useState('0');
  const [invoice, setInvoice] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTransactionAmount, setPendingTransactionAmount] = useState<
    PendingTransaction[]
  >([]);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setResults([]);
        return;
      }

      try {
        setIsLoading(true);
        const res = await axiosClient.post(
          `/transact/search?query=${searchQuery}`
        );
        setResults(res.data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleUploadComplete = async (res: any) => {
    try {
      setInvoice(res[0].url);
    } catch (error) {
      toast.error('Error in uploading invoice');
    }
  };

  const openModal = (business: Business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTransactionAmount('');
  };

  const pendingTransactions = async () => {
    try {
      const response = await axiosClient.get('/transact/pending', {
        headers: { Authorization: 'Bearer ' + Cookies.get('user') },
      });
      setPendingTransactionAmount(response.data);
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Transaction error:', error);
    }
  };

  const handleTransactionSubmit = async () => {
    if (!selectedBusiness) {
      toast.error('No business selected');
      return;
    }

    try {
      const payload = {
        id: selectedBusiness.id,
        amount: parseFloat(transactionAmount),
        invoice: invoice,
        date: new Date().toISOString(),
      };
      const response = await axiosClient.post('/transact/new', payload, {
        headers: { Authorization: `Bearer ${Cookies.get('user')}` },
      });

      if (response.data.message === 'Insufficient Sum assured') {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        closeModal();
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Transaction error:', error);
    }
  };

  useEffect(() => {
    pendingTransactions();
  }, []);

  useEffect(() => {
    if (invoice !== '' && transactionAmount !== '') {
      setLoading(true);
    }
  }, [invoice, transactionAmount]);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="w-1/2 p-4 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
            }}
          />
          <div className="relative mb-4 mt-10">
            <Input
              type="text"
              placeholder="Search businesses or promoters..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            {isLoading && (
              <FaSpinner className="absolute right-3 top-3 text-gray-400 animate-spin" />
            )}
          </div>
          {results.length > 0 && (
            <Card>
              <CardContent className="p-0 bg-gray-50 border-collapse">
                <ul className="divide-y divide-gray-200">
                  {results.map((user) => (
                    <li
                      key={user.id}
                      className="p-4 mb-2 rounded-lg shadow bg-white hover:bg-gray-200 transition duration-300 cursor-pointer"
                      onClick={() => openModal(user)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-lg text-gray-800">
                            {user.business_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {user.promoter_name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Sum Assured:</span> ₹
                            {user.sumAssured}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Safety Rating:</span>{' '}
                            {user.safetyRating}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Transaction Modal"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Execute Transaction</h2>
                <Button
                  onClick={closeModal}
                  className="bg-transparent hover:bg-gray-200 p-2 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="black"
                    className="size-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </Button>
              </div>
              <p className="mb-4">
                <span className="text-lg font-bold items-center">
                  {selectedBusiness?.business_name}
                </span>{' '}
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Transaction Amount
                </label>
                <input
                  type="number"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Invoice
                </label>
                <UploadButton
                  endpoint="invoiceUploader"
                  onClientUploadComplete={handleUploadComplete}
                  onUploadError={(error) => {
                    console.error('Upload error:', error);
                  }}
                  className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={handleTransactionSubmit}
                  className="text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 transition duration-200"
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </div>
            </Modal>
          )}
        </div>
      </div>

      <div className="w-1/2 p-4 bg-gray-50 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-3 pt-5 text-center pb-5 mt-3">
          Pending Transactions
        </h2>
        {pendingTransactionAmount.length === 0 ? (
          <div className="text-center text-lg mt-6 text-gray-600">
            No pending transactions.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {pendingTransactionAmount.map((transaction) => (
              <li
                key={transaction.id}
                className="p-4 bg-white rounded-lg shadow mb-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg text-gray-800">
                      {transaction.business_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Amount: ₹{transaction.amount}
                    </p>
                    {transaction.invoice && (
                      <div className="mt-2 flex items-center">
                        <FaFilePdf className="text-red-500 mr-2" />
                        <a
                          href={transaction.invoice}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
                        >
                          View PDF
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Date: {transaction.date}
                    </p>
                    <span className="flex space-x-4 mt-3">
                      <Button
                        className="text-sm mt-1 max-w-sm hover:bg-gray-500"
                        onClick={async () => {
                          try {
                            const payload = {
                              id: transaction.id,
                              type: 'COMPLETE',
                            };
                            const res = await axiosClient.post(
                              '/transact/approve',
                              payload
                            );
                            setPendingTransactionAmount((prev) =>
                              prev.filter(
                                (transactions) =>
                                  transactions.id !== transaction.id
                              )
                            );
                            toast.success('Transaction Completed Successfully');
                          } catch (error) {
                            toast.error('Error in transacting');
                          }
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        className="text-sm mt-1 max-w-sm bg-red-700 hover:bg-gray-500"
                        onClick={async () => {
                          try {
                            const payload = {
                              id: transaction.id,
                              type: 'REJECT',
                            };
                            const res = await axiosClient.post(
                              '/transact/approve',
                              payload
                            );
                            toast.success('Transaction Rejected Successfully');
                          } catch (error) {
                            toast.error('Error in transacting');
                          } finally {
                            router.refresh();
                          }
                        }}
                      >
                        Reject
                      </Button>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
