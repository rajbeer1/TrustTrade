import Navbar from "@/components/navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
         <div className="h-screen w-screen flex">
        <Navbar/>
        {children}</div></body>
    </html>
  );
}
