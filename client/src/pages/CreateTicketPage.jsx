import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTicket } from '../api/tickets.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  const title = values.title.trim();

  if (!title) errors.title = 'Title is required';
  else if (title.length > 120) errors.title = 'Title must be 120 characters or less';

  if (!values.description.trim()) errors.description = 'Description is required';

  const email = values.customerEmail.trim();
  if (!email) errors.customerEmail = 'Customer email is required';
  else if (!EMAIL_REGEX.test(email)) errors.customerEmail = 'Customer email is not a valid email address';

  return errors;
}

function CreateTicketPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: '',
    description: '',
    customerEmail: '',
    priority: 'Medium',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const ticket = await createTicket({
        ...values,
        title: values.title.trim(),
        description: values.description.trim(),
        customerEmail: values.customerEmail.trim(),
      });
      navigate(`/tickets/${ticket.id}`);
    } catch (err) {
      if (err.details && Object.keys(err.details).length > 0) {
        setErrors(err.details);
      } else {
        setFormError(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2>New ticket</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>
            Title
            <input name="title" value={values.title} onChange={handleChange} />
          </label>
          {errors.title && <p>{errors.title}</p>}
        </div>

        <div>
          <label>
            Description
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
            />
          </label>
          {errors.description && <p>{errors.description}</p>}
        </div>

        <div>
          <label>
            Customer email
            <input
              name="customerEmail"
              value={values.customerEmail}
              onChange={handleChange}
            />
          </label>
          {errors.customerEmail && <p>{errors.customerEmail}</p>}
        </div>

        <div>
          <label>
            Priority
            <select name="priority" value={values.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          {errors.priority && <p>{errors.priority}</p>}
        </div>

        {formError && <p>Error: {formError}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create ticket'}
        </button>
        {' '}
        <Link to="/">Cancel</Link>
      </form>
    </div>
  );
}

export default CreateTicketPage;