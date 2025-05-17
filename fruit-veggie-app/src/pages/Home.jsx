import { useState } from 'react';
import ProduceGrid from '../components/ProduceGrid';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div>
      <h1>Fruits & Vegetables Explorer</h1>
      <input 
        type="text" 
        placeholder="Search for produce..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ProduceGrid searchTerm={searchTerm} />
    </div>
  );
}

export default Home;