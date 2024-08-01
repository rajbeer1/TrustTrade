'use client'
import React,{useState,useEffect} from 'react'
import axiosClient from '@/helpers/axios';
import { ClaimCard } from '@/components/claim';
import Cookies from 'js-cookie';
const Claim =()=>{
const [claims, setclaim] = useState([]);
  const token = Cookies.get('user');
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient.post(
          `/transact/claim`,{}, {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setclaim(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);
  return (
     <div className="w-4/5 bg-gray-100 min-h-screen p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Claims List
        </h1>
        <div className="h-[calc(100vh-100px)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {claims.map((claim) => (
              <div key={claim.id} className="h-[calc((100vh-120px)/2)]">
                <ClaimCard claim={claim} />
              </div>
            ))}
          </div>
        </div></div>
  );
}

export default Claim