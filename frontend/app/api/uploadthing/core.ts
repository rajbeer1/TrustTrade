import { createUploadthing, type FileRouter } from 'uploadthing/next';


const f = createUploadthing();




export const ourFileRouter = {

  pdfUploader: f({ pdf: { maxFileSize: '4MB' } })
    .onUploadComplete(async ({ metadata, file }) => {
     const url =file.url
      return {url };
    }),
  invoiceUploader: f({ pdf: { maxFileSize: '4MB' } }).onUploadComplete(async ({ metadata, file }) => {
    const url = file.url
    return { url };
   })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
