import { useEffect, useState } from 'react';
import { fetchSummary } from '../api/tickets.js';

function SummaryCards() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSummary()
      .then(setSummary)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Could not load summary: {error}</p>;
  if (!summary) return <p>Loading summary...</p>;

  return (
    <div>
      <span>Total: {summary.total}</span>
      {' | '}
      <span>Open: {summary.Open}</span>
      {' | '}
      <span>In Progress: {summary['In Progress']}</span>
      {' | '}
      <span>Resolved: {summary.Resolved}</span>
    </div>
  );
}

export default SummaryCards;