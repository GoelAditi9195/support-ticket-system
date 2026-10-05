import SummaryCards from '../components/SummaryCards.jsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTickets } from '../api/tickets.js';

function TicketListPage() {
  const [tickets, setTickets] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    sort: 'newest',
    page: 1,
  });

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput.trim(), page: 1 }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchTickets(filters);
        setTickets(data.tickets);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filters]);

  function handleChange(e) {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value, page: 1 }));
  }

  function goToPage(page) {
    setFilters((prev) => ({ ...prev, page }));
  }

  return (
    <div>
       <SummaryCards />
      <div>
        <input
          type="text"
          placeholder="Search by title or email"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">All statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <select name="priority" value={filters.priority} onChange={handleChange}>
          <option value="">All priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select name="sort" value={filters.sort} onChange={handleChange}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {loading && <p>Loading tickets...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && tickets.length === 0 && <p>No tickets found.</p>}

      {!loading && !error && tickets.length > 0 && (
        <>
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                {' | '}
                {ticket.customerEmail} | {ticket.priority} | {ticket.status}
              </li>
            ))}
          </ul>

          <div>
            <button
              onClick={() => goToPage(filters.page - 1)}
              disabled={filters.page <= 1}
            >
              Previous
            </button>
            <span>
              {' '}Page {filters.page} of {totalPages} ({totalCount} tickets){' '}
            </span>
            <button
              onClick={() => goToPage(filters.page + 1)}
              disabled={filters.page >= totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TicketListPage;