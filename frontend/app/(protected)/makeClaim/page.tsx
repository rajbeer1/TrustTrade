'use client';
import React from 'react';
import TransactionList from '@/components/claimtranscation';
import { jwtDecode } from '@/helpers/jwt';

import Link from 'next/link';
function App() {
  const email = jwtDecode();
  const userEmail = email?.email;
  console.log(userEmail);
  if (!userEmail) {
    return <Link href={'/'}></Link>;
  }
  return <TransactionList userEmail={userEmail} />;
}

export default App;
