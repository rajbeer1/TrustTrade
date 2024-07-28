'use client';

import { UploadButton } from '@/components/uploadthing';
import Cookies from 'js-cookie';
import axiosClient from '@/helpers/axios';
export default function Uploadbutton() {
  const token = Cookies.get('user');

  return (
    <UploadButton
      endpoint="pdfUploader"
      onClientUploadComplete={async (res) => {
        const data = await axiosClient.post(
          '/funds/add',
          {
            url: res[0].url,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(data);
        console.log('Files: ', res);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
