'use client'
import Link from 'next/link';
import React from 'react';
import {
  FaHome,
  FaFileAlt,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaClipboardList,
  FaSignOutAlt
} from 'react-icons/fa';
import Cookies from 'js-cookie';
const Navbar = () => {
  return (
    <nav className="w-1/5 bg-gray-800 text-white p-4 h-screen flex flex-col ">
      <div className="mt-[20vh]">
        <ul className="space-y-4">
          <li>
            <Link href="/home">
              <div className="flex text-2xl items-center py-2 px-4 hover:bg-gray-700 rounded">
                {' '}
                <FaHome className="mr-3" /> Dashboard
              </div>
            </Link>
          </li>
          <li>
            <Link href="/proof-funds">
              <div className="flex text-2xl items-center py-2 px-4 hover:bg-gray-700 rounded">
                <FaFileAlt className="mr-3" /> Documents
              </div>
            </Link>
          </li>
          <li>
            <Link href="trade">
              <div className="flex text-2xl items-center py-2 px-4 hover:bg-gray-700 rounded">
                <FaExchangeAlt className="mr-3" /> Trade
              </div>
            </Link>
          </li>
          <li>
            {' '}
            <Link href="makeClaim">
              <div className="flex text-2xl items-center py-2 px-4 hover:bg-gray-700 rounded">
                <FaMoneyBillWave className="mr-3" /> Make a Claim
              </div>
            </Link>
          </li>
          <li>
            {' '}
            <Link href="/claim">
              <div className="flex text-2xl items-center py-2 px-4 hover:bg-gray-700 rounded">
                <FaClipboardList className="mr-3" /> Claims
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className=" mt-auto mb-4">
        <button className="flex text-lg items-center py-2 px-4 hover:bg-red-500 rounded w-full justify-center " onClick={() => {
          Cookies.remove('user')
          window.location.href = '/';
        }}>
          <FaSignOutAlt className="mr-3" /> Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
