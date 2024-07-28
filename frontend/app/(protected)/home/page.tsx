import React from 'react';
import {SummaryDetails} from '@/components/summaryDetails';
import { BuyerTransactionHistoryGraph } from '@/components/BuyertransactionGraph';
import { RecentTrades } from '@/components/recentTrades';
import { SellerTransactionHistoryGraph } from '@/components/SellerTransactionGraph';

const MainPage = () => {
  return (
    <div className="w-4/5 flex flex-wrap m-10">
      <div className="w-1/2 h-1/2 p-2">
        <SummaryDetails />
      </div>
      <div className="   w-1/2 h-1/2 p-2">
        <RecentTrades />
      </div>
      <div className="w-1/2 h-1/2 p-2">
        <BuyerTransactionHistoryGraph />
      </div>
      <div className="w-1/2 h-1/2 p-2">
        <SellerTransactionHistoryGraph />
      </div>
    </div>
  );
};

export default MainPage;
