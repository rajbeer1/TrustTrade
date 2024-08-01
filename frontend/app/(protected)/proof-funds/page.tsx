'use client';

import { useState, useEffect } from 'react';
import { UploadButton } from '@/components/uploadthing';
import Cookies from 'js-cookie';
import axiosClient from '@/helpers/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function MainPage() {
  const [uploadStatus, setUploadStatus] = useState('null');
  const [uploadedData, setUploadedData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const token = Cookies.get('user');

  const handleUploadComplete = async (res: any) => {
    try {
      const response = await axiosClient.post(
        '/funds/add',
        { url: res[0].url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      console.log('Files: ', res);
      if (response.data.message === 'document is not valid') {
        setUploadStatus('error');
      } else {
        setUploadStatus('success');
        setUploadedData(response.data);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
    }
  };

  useEffect(() => {
    if (uploadStatus === 'success') {
      setTimeout(() => setShowSuccess(true), 100);
    } else {
      setShowSuccess(false);
    }
  }, [uploadStatus]);

  return (
    <div className="flex w-4/5 h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Proof of funds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`transition-all duration-500 ease-in-out ${
                uploadStatus === 'success'
                  ? 'opacity-0 h-0'
                  : 'opacity-100 h-auto'
              }`}
            >
              <div className="text-center mb-6">
                <p className="text-lg font-semibold mb-2">
                  Accepted ITR Forms:
                </p>
                <div className="flex justify-center space-x-2">
                  {['3', '4 (Sugam)', '5', '7'].map((itr) => (
                    <Button
                      key={itr}
                      variant="outline"
                      className="rounded-full"
                    >
                      {itr}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <UploadButton
                  endpoint="pdfUploader"
                  onClientUploadComplete={handleUploadComplete}
                  onUploadError={(error) => {
                    console.error('Upload error:', error);
                    setUploadStatus('error');
                  }}
                />
              </div>
            </div>

            <div
              className={`transition-all duration-500 ease-in-out ${
                showSuccess
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-0 transform -translate-y-10'
              }`}
            >
              {uploadStatus === 'success' && uploadedData && (
                <div className="text-center">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-green-600 mb-2">
                      Upload Successful!
                    </h3>
                    <div className="bg-green-100 border border-green-400 rounded-lg p-4">
                      <p className="text-xl font-semibold mb-2">
                        {uploadedData.name}
                      </p>
                      <p className="text-lg">
                        ITR Type:{' '}
                        <span className="font-bold">
                          {uploadedData.formNumber}
                        </span>
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setUploadStatus('null');
                      setUploadedData(null);
                    }}
                    className="mt-4"
                  >
                    Upload Another ITR
                  </Button>
                </div>
              )}
            </div>

            {uploadStatus === 'error' && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was an error processing your document. Please ensure
                  it's a valid ITR form.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
