'use client';
import React,{useState,useEffect} from 'react';
import TransactionList from '@/components/claimtranscation';
import { jwtDecode } from '@/helpers/jwt';
import Cookies from 'js-cookie';
import Loader from '@/components/loader';

import Link from 'next/link';
function App() {
  const email = jwtDecode();

const [name, setName] = useState('');
const [isMounted, setIsMounted] = useState(false);
const token = Cookies.get('user');

useEffect(() => {
  setIsMounted(true);
  if (token) {
    const data = jwtDecode();
    if (!data) {
      return;
    }
    setName(data?.owner);
  }
}, [token]);
if (!isMounted) {
  return <Loader />;
}
  const userEmail = email?.email;
  console.log(userEmail);
  if (!userEmail) {
    return <Link href={'/'}></Link>;
  }
  return <TransactionList userEmail={userEmail} />;
}

export default App;
