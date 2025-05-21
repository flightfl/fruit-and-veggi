// import { useState } from 'react';
// import ProduceGrid from '../components/ProduceGrid';

// function Home() {
//   const [searchTerm, setSearchTerm] = useState('');
  
//   return (
//     <div>
//       <h1>Fruits & Vegetables Explorer</h1>
//       <input 
//         type="text" 
//         placeholder="Search for produce..." 
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <ProduceGrid searchTerm={searchTerm} />
//     </div>
//   );
// }

// export default Home;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProduceItems } from '../services/api';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [produce, setProduce] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch produce data from API
  useEffect(() => {
    const fetchProduce = async () => {
      try {
        setLoading(true);
        const data = await getProduceItems();
        setProduce(data);
        setError(null);
      } catch (err) {
        setError('Failed to load produce data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduce();
  }, []);
  
  // Filter produce based on search term
  const filteredProduce = produce.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Render loading state
  if (loading) {
    return <div>Loading produce data...</div>;
  }
  
  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <section>
      <header>
        <h1>Fruits & Vegetables Explorer</h1>
      </header>
      
      <div>
        <input 
          type="text" 
          placeholder="Search for produce..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search for produce"
        />
      </div>
      
      <div className="produce-grid">
        {filteredProduce.length > 0 ? (
          filteredProduce.map(item => (
            <article key={item._id} className="produce-card">
              <img src={item.imageUrl} alt={item.name} />
              <h2>{item.name}</h2>
              <p>{item.category}</p>
              <Link to={`/detail/${item._id}`}>View Details</Link>
            </article>
          ))
        ) : (
          <p>No produce items found matching your search.</p>
        )}
      </div>
    </section>
  );
}

export default Home;