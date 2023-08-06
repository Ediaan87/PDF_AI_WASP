import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPdf from '@wasp/queries/getPdf';
import askQuestion from '@wasp/actions/askQuestion';

export function Pdf() {
  const { pdfId } = useParams();
  const { data: pdf, isLoading, error } = useQuery(getPdf, { pdfId });
  const askQuestionFn = useAction(askQuestion);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAskQuestion = async () => {
    const response = await askQuestionFn({ pdfId, question });
    setQuestion('');
    setResponse(response);
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{pdf.title}</h1>
      <p>{pdf.content}</p>
      <div className='mt-4'>
        <input
          type='text'
          placeholder='Ask a question'
          className='px-1 py-2 border rounded text-lg'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={handleAskQuestion}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded ml-2'
        >
          Ask
        </button>
      </div>
      {response && <p className='mt-4'>Response: {response}</p>}
    </div>
  );
}