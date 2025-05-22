import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProduceItems } from '../services/api';
import FilterControls from '../components/FilterControls';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    nutritionFilter: 'none'
  });
  const [allProduce, setAllProduce] = useState([]); // Store all data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch ALL produce data once on component mount
  useEffect(() => {
    const fetchProduce = async () => {
      try {
        setLoading(true);
        const data = await getProduceItems(); // Get all data, no filters
        setAllProduce(data);
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
  
  // Apply all filters client-side
  const filteredProduce = allProduce.filter(item => {
    // Search filter
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = filters.category === 'all' || item.category === filters.category;
    
    // Nutrition filter
    let matchesNutrition = true;
    switch (filters.nutritionFilter) {
      case 'highProtein':
        matchesNutrition = item.nutrition.protein > 2;
        break;
      case 'lowCalorie':
        matchesNutrition = item.nutrition.calories < 50;
        break;
      case 'highFiber':
        matchesNutrition = item.nutrition.fiber > 2;
        break;
      case 'none':
      default:
        matchesNutrition = true;
    }
    
    return matchesSearch && matchesCategory && matchesNutrition;
  });
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  if (loading) {
    return <div>Loading produce data...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <section>
      <header>
        <h1>Fruits & Vegetables Explorer</h1>
      </header>
      
      <div className="search-and-filters">
        <div className="search-section">
          <input 
            type="text" 
            placeholder="Search for produce..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search for produce"
          />
        </div>
        
        <FilterControls 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
      </div>
      
      <div className="results-info">
        <p>Showing {filteredProduce.length} of {allProduce.length} items</p>
      </div>
      
      <div className="produce-grid">
        {filteredProduce.length > 0 ? (
          filteredProduce.map(item => (
            <article key={item._id} className="produce-card">
              <img src={item.imageUrl} alt={item.name} />
              <h2>{item.name}</h2>
              <p>Category: {item.category}</p>
              <div className="nutrition-preview">
                <small>
                  {item.nutrition.calories} cal | 
                  {item.nutrition.protein}g protein | 
                  {item.nutrition.fiber}g fiber
                </small>
              </div>
              <Link to={`/detail/${item._id}`}>View Details</Link>
            </article>
          ))
        ) : (
          <p>No produce items found matching your criteria.</p>
        )}
      </div>
    </section>
  );
}

export default Home;