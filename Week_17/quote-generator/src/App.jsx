import { useState } from 'react'
import Controls from './components/Controls.jsx'
import QuoteCard from './components/QuoteCard.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.api-ninjas.com/v2/quotes";

export default function App() { 
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchQuote({ category, author}) {
    const params = new URLSearchParams();
    if (category) params.set("categories", category);
    if (author) params.set("author", author);

    setLoading(true);
    setError("");
    setQuote(null);

    try {
      const res = await fetch(`${BASE_URL}?${params}`, {
        headers: { "X-Api-Key": API_KEY },
      });
      if (!res.ok) throw new Error(`API error: ${res.statusText}`);

      const data = await res.json();

      if (!data.length) {
        setError("No quotes found. Try a different category or author.");
        return;
      }

      setQuote(data[0]);
    } catch (err) {
      setError(err.message);
    } finally { 
      setLoading(false);
    }
  }

  return (
    <>
      <div className='app'>
        <h1>Quote Generator</h1>
        <Controls onFetch={fetchQuote} loading={loading} />
        {error && <ErrorMessage message={error} />}
        {quote && <QuoteCard quote={quote} />}
      </div>
    </>
  );
};


