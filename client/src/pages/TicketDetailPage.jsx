import { useParams } from 'react-router-dom';

function TicketDetailPage() {
  const { id } = useParams();
  return <p>Details for ticket {id} will go here</p>;
}

export default TicketDetailPage;