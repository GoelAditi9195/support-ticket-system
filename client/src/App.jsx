import { Routes, Route, NavLink } from 'react-router-dom';
import TicketListPage from './pages/TicketListPage.jsx';
import TicketDetailPage from './pages/TicketDetailPage.jsx';
import CreateTicketPage from './pages/CreateTicketPage.jsx';
import './App.css';

function App() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">Support Desk</div>
        <nav>
          <NavLink to="/" end>
            Tickets
          </NavLink>
          <NavLink to="/tickets/new">New ticket</NavLink>
        </nav>
      </aside>

      <main className="content">
        <Routes>
          <Route path="/" element={<TicketListPage />} />
          <Route path="/tickets/new" element={<CreateTicketPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;