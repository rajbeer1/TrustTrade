import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function


export const ourFileRouter = {

  pdfUploader: f({ pdf: { maxFileSize: '4MB' } })

    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:');

      console.log('file url', file.url);
     const url =file.url
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return {url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
