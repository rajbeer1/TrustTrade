import React from 'react';
interface Claim {
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

export const ClaimCard: React.FC<{ claim: Claim }> = ({ claim }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2">
        <h2 className="text-xl font-bold text-white">Claim Details</h2>
        <p className="text-blue-100 text-sm">ID: {claim.id.slice(0, 8)}...</p>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-800 mb-1">
            Transaction Info
          </h3>
          <p className="text-sm text-gray-600">
            Date: {new Date(claim.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Amount: ₹{claim.amount.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Status:{' '}
            <span className="font-medium text-indigo-600">{claim.status}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Buyer</h3>
            <p className="text-sm text-gray-600">{claim.buyer.business_name}</p>
            <p className="text-sm text-gray-600">{claim.buyer.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Seller</h3>
            <p className="text-sm text-gray-600">
              {claim.seller.business_name}
            </p>
            <p className="text-sm text-gray-600">{claim.seller.email}</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded p-3">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Claim Info
          </h3>
          <p className="text-sm text-gray-600">
            Type:{' '}
            <span className="font-medium text-indigo-600">
              {claim.claimType} Claim
            </span>
          </p>
          <p className="text-sm text-gray-600">
            By:{' '}
            <span className="font-medium">{claim.claimedBy.business_name}</span>
          </p>
          <p className="text-sm text-gray-600">
            Against:{' '}
            <span className="font-medium">
              {claim.claimedAgainst.business_name}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
