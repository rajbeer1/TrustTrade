'use client';
import axiosClient from '@/helpers/axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import NoTransactionData from './notransaction';
export const SellerTransactionHistoryGraph = () => {
  const [data, setdata] = useState([]);
  const getdata = async () => {
    const data = await axiosClient.get('/transact/seller', {
      headers: { Authorization: `Bearer ${Cookies.get('user')}` },
    });
    setdata(data.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  const getBarColor = (status: any) => {
    switch (status) {
      case 'COMPLETE':
        return '#16a34a';
      case 'PENDING':
        return '#ca8a04 ';
      case 'ISSUE':
        return '#dc2626 ';
      default:
        return '#9E9E9E';
    }
  };
  if (data.length < 2 ) {
    return <NoTransactionData />;
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-2 text-center">selling History</h2>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div
                      className="custom-tooltip"
                      style={{
                        backgroundColor: '#fff',
                        padding: '10px',
                        border: '1px solid #ccc',
                      }}
                    >
                      <p>
                        <strong>{data.buyerName}</strong>
                      </p>
                      <p>Amount: ₹{data.amount}</p>
                      <p>
                        Status:{' '}
                        {data.status == 'ISSUE' ? 'BUYER_ISSUE' : data.status}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Bar
              dataKey="amount"
              fill="#000"
              name="Transaction Amount"
              fontSize={"10px"}
              shape={(props:any) => {
                return (
                  <rect
                    {...props}
                    //@ts-ignore
                    fill={getBarColor(data[props.index].status)}
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
