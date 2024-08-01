'use client'
import React from 'react';
import TransactionList from '@/components/claimtranscation';
import { jwtDecode } from '@/helpers/jwt';

function App() {
  const email = jwtDecode()

  const userEmail = email?.email;
  console.log(userEmail)// Replace with actual user email

  return <TransactionList userEmail={userEmail} />;
}

export default App;
