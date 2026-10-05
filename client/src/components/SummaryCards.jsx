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

   const cards = [
    { label: 'Total tickets', value: summary.total, tone: 'total' },
    { label: 'Open', value: summary.Open, tone: 'open' },
    { label: 'In Progress', value: summary['In Progress'], tone: 'progress' },
    { label: 'Resolved', value: summary.Resolved, tone: 'resolved' },
  ];

  return (
    <div className="summary">
      {cards.map((card) => (
        <div className={`summary-card tone-${card.tone}`} key={card.label}>
          <span className="summary-label">{card.label}</span>
          <span className="summary-number">{card.value}</span>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;