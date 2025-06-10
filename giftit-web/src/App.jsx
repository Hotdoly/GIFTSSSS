import React, { useState } from 'react';
import GiftForm from './components/GiftForm';
import GiftSuggestions from './components/GiftSuggestions';

export default function App() {
  const [data, setData] = useState(null);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">🎁 GiftIt</h1>
      {!data ? (
        <GiftForm onSubmit={setData} />
      ) : (
        <GiftSuggestions interesses={data.interesses} />
      )}
    </div>
  );
}
