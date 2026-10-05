import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTicket, updateTicket } from '../api/tickets.js';

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const statusClass = (status) => status.toLowerCase().replace(' ', '-');

function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchTicket(id);
        setTicket(data);
        setStatus(data.status);
        setPriority(data.priority);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleSave() {
    setSaving(true);
    setSaveError('');
    setSaved(false);
    try {
      const updated = await updateTicket(id, { status, priority });
      setTicket(updated);
      setSaved(true);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading ticket...</p>;
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <Link to="/">Back to tickets</Link>
      </div>
    );
  }

  const changed = status !== ticket.status || priority !== ticket.priority;

  return (
    <div>
      <Link to="/" className="back-link">
        &larr; Back to tickets
      </Link>

      <div className="detail-head">
        <h2>
          <span className="muted">#{ticket.id}</span> {ticket.title}
        </h2>
        <div>
          <span className={`badge priority-${ticket.priority.toLowerCase()}`}>
            {ticket.priority}
          </span>{' '}
          <span className={`badge status-${statusClass(ticket.status)}`}>
            {ticket.status}
          </span>
        </div>
      </div>

      <p className="muted detail-meta">
        {ticket.customerEmail} &nbsp;&nbsp; Created {formatDate(ticket.createdAt)}{' '}
        &nbsp;&nbsp; Updated {formatDate(ticket.updatedAt)}
      </p>

      <div className="detail-grid">
        <section className="panel">
          <h3>Ticket details</h3>
          <dl>
            <dt>Title</dt>
            <dd>{ticket.title}</dd>
            <dt>Description</dt>
            <dd>{ticket.description}</dd>
            <dt>Customer email</dt>
            <dd>{ticket.customerEmail}</dd>
            <dt>Priority</dt>
            <dd>
              <span className={`badge priority-${ticket.priority.toLowerCase()}`}>
                {ticket.priority}
              </span>
            </dd>
            <dt>Status</dt>
            <dd>
              <span className={`badge status-${statusClass(ticket.status)}`}>
                {ticket.status}
              </span>
            </dd>
          </dl>
        </section>

        <section className="panel">
          <h3>Update ticket</h3>

          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button onClick={handleSave} disabled={saving || !changed}>
            {saving ? 'Saving...' : 'Update ticket'}
          </button>

          {saved && <p className="muted">Saved.</p>}
          {saveError && <p>Error: {saveError}</p>}
        </section>
      </div>
    </div>
  );
}

export default TicketDetailPage;