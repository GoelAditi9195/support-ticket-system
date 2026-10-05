import { Routes, Route, Link } from 'react-router-dom';
import TicketListPage from './pages/TicketListPage.jsx';
import TicketDetailPage from './pages/TicketDetailPage.jsx';
import './App.css';

function App() {
  return (
    <div>
      <header>
        <Link to="/">
          <h1>Support Desk</h1>
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<TicketListPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
