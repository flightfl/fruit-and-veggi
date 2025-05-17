import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  
  return (
    <div>
      <h1>Detail Page</h1>
      <p>Viewing item with ID: {id}</p>
    </div>
  );
}

export default Detail;