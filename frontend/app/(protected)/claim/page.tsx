'use client'
import React,{useState,useEffect} from 'react'
import axiosClient from '@/helpers/axios';
import { ClaimCard } from '@/components/claim';
import Cookies from 'js-cookie';
export interface Claim {
  id: string; 
  date: string;
  amount: number;
  status: string;
  buyer: {
    business_name: string;
    email: string;
  };
  seller: {
    business_name: string;
    email: string;
  };
  claimType: string;
  claimedBy: {
    business_name: string;
  };
  claimedAgainst: {
    business_name: string;
  };
}
const Claim = () => {
   const dummyClaims: Claim[] = [
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
       claimType: 'buyer',
       claimedBy: {
         business_name: 'Dummy Buyer 1',
       },
       claimedAgainst: {
         business_name: 'Dummy Seller 1',
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
       claimType: 'seller',
       claimedBy: {
         business_name: 'Dummy Seller 2',
       },
       claimedAgainst: {
         business_name: 'Dummy Buyer 2',
       },
     },
   ];
const [claims, setclaim] = useState<Claim[]>(dummyClaims);
  const token = Cookies.get('user');
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient.post(
          `/transact/claim`,{}, {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.length > 1) {
          setclaim(response.data);
        }
        
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