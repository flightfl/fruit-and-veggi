import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduceById, addToFavorites } from '../services/api';

function Detail() {
  const { id } = useParams();
  const [produce, setProduce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteStatus, setFavoriteStatus] = useState(null);
  
  useEffect(() => {
    const fetchProduceDetails = async () => {
      try {
        setLoading(true);
        const data = await getProduceById(id);
        setProduce(data);
        setError(null);
      } catch (err) {
        setError('Failed to load produce details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduceDetails();
  }, [id]);
  
  const handleAddToFavorites = async () => {
    try {
      await addToFavorites(id);
      setFavoriteStatus('Added to favorites!');
    } catch (err) {
      setFavoriteStatus('Error adding to favorites, please try login in first');
      console.error(err);
    }
  };
  
  if (loading) {
    return <div>Loading details...</div>;
  }
  
  if (error || !produce) {
    return <div>Error: {error || 'Produce not found'}</div>;
  }
  
  return (
    <div>
      <Link to="/">&larr; Back to all produce</Link>
      
      <div className="produce-detail">
        <img 
          src={produce.imageUrl} 
          alt={produce.name} 
          className="produce-detail-image"
        />
        
        <div className="produce-detail-info">
          <h1>{produce.name}</h1>
          <p>Category: {produce.category}</p>
          
          <h2>Nutrition Information</h2>
          <ul>
            <li>Calories: {produce.nutrition.calories}</li>
            <li>Protein: {produce.nutrition.protein}g</li>
            <li>Carbs: {produce.nutrition.carbs}g</li>
            <li>Fat: {produce.nutrition.fat}g</li>
            <li>Fiber: {produce.nutrition.fiber}g</li>
          </ul>
          
          <button onClick={handleAddToFavorites}>
            Add to Favorites
          </button>
          
          {favoriteStatus && <p>{favoriteStatus}</p>}
        </div>
      </div>
    </div>
  );
}

export default Detail;