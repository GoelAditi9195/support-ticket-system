const BASE_URL = 'http://localhost:4000/api/tickets';

async function request(url, options) {
  let res;
  try {
    res = await fetch(url, options);
  } catch {
    throw new Error('Cannot reach the server. Is the backend running?');
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.error?.message || 'Something went wrong');
    err.status = res.status;
    err.details = data?.error?.details || {};
    throw err;
  }

  return data;
}

const jsonOptions = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export function fetchTickets(params = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  return request(`${BASE_URL}?${query}`);
}

export const fetchSummary = () => request(`${BASE_URL}/summary`);
export const fetchTicket = (id) => request(`${BASE_URL}/${id}`);
export const createTicket = (body) => request(BASE_URL, jsonOptions('POST', body));
export const updateTicket = (id, body) =>
  request(`${BASE_URL}/${id}`, jsonOptions('PATCH', body));