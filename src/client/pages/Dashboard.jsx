import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserPdfs from '@wasp/queries/getUserPdfs';
import uploadPdf from '@wasp/actions/uploadPdf';

export function Dashboard() {
  const { data: pdfs, isLoading, error } = useQuery(getUserPdfs);
  const uploadPdfFn = useAction(uploadPdf);
  const [file, setFile] = useState(null);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    await uploadPdfFn({ file: uploadedFile });
  };

  return (
    <div className='p-4'>
      <input
        type='file'
        onChange={handleFileUpload}
        className='bg-slate-100 py-2 px-4 rounded mb-4'
      />
      {pdfs.map((pdf) => (
        <div key={pdf.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{pdf.name}</div>
          <div>Uploaded by: {pdf.uploader.username}</div>
          <div>Size: {pdf.size} KB</div>
          <div>Uploaded on: {pdf.uploadedOn}</div>
          <div>Questions: {pdf.questions.length}</div>
          <Link to={`/pdf/${pdf.id}`} className='text-blue-500'>View PDF</Link>
        </div>
      ))}
    </div>
  );
}