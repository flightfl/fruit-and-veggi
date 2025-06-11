// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getFavorites, removeFromFavorites } from '../services/api';
// import { useUser } from '../contexts/UserContext';

// function Favorites() {
//   const { user } = useUser(); 
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [removingItems, setRemovingItems] = useState(new Set());
  
//   const fetchFavorites = async () => {
//     try {
//       setLoading(true);
//       const data = await getFavorites();
//       setFavorites(data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load favorites');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   useEffect(() => {
//     fetchFavorites();
//   }, []);
  
//   const handleRemoveFromFavorites = async (id) => {
//     try {
//       setFavorites(prevFavorites => prevFavorites.filter(item => item._id !== id));
//       setRemovingItems(prev => new Set([...prev, id]));
//       await removeFromFavorites(id);
//       // Refresh favorites after removing
//       // fetchFavorites();
//       // Remove from removing set on success
//       setRemovingItems(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(id);
//         return newSet;
//       });
//     } catch (err) {
//       console.error('Error removing from favorites:', err);
//        // Revert optimistic update on error
//       fetchFavorites();
//       setRemovingItems(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(id);
//         return newSet;
//       });
      
//       // Show error message
//       setError('Failed to remove item. Please try again.');
//     }
//   };
  
//   if (loading) {
//     return <div>Loading favorites...</div>;
//   }
  
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
  
//   return (
//     <div>
//       <h1>Your Favorites</h1>

//       {user && (
//         <div className="welcome-message">
//           <p>👋 Welcome, {user.name}! Now you can save your favorite fruits and vegetables.</p>
//         </div>
//       )}
      
//       {!user && (
//           <p>🔐 Log in to save your favorite items!</p>
//       )}

//       {favorites.length === 0 ? (
//         <div>
//           <p>You haven't added any favorites yet.</p>
//           <p>Go back to <Link to="/">browse produce</Link> and click "Add to Favorites" on items you like!</p>
//         </div>
//       ) : (
//         <div className="produce-grid">
//           {favorites.map(item => (
//             <article key={item._id} className="produce-card">
//               {/* <img src={item.imageUrl} alt={item.name} /> */}
//               <img 
//                 src={item.imageUrl || '/default-produce.png'} 
//                 alt={item.name}
//                 onError={(e) => {
//                   e.target.src = '/default-produce.png';
//                 }}
//               />
//               <h2>{item.name}</h2>
//               <p>{item.category}</p>
//               <Link to={`/detail/${item._id}`} className="view-details-btn">View Details</Link>
//               <button 
//                 onClick={() => handleRemoveFromFavorites(item._id)}
//                 className="remove-favorite"
//                 disabled={removingItems.has(item._id)}
//               >
//                 {removingItems.has(item._id) ? 'Removing...' : 'Remove'}
//               </button>
//             </article>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Favorites;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, removeFromFavorites } from '../services/api';
import { useUser } from '../contexts/UserContext';

function Favorites() {
  const { user } = useUser(); 
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingItems, setRemovingItems] = useState(new Set());
  
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      console.log('🔍 Fetched favorites from API:', data); // DEBUG
      setFavorites(data);
      setError(null);
    } catch (err) {
      setError('Failed to load favorites');
      console.error('❌ Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Only fetch if user is logged in
    if (user) {
      fetchFavorites();
    } else {
      setLoading(false);
      setFavorites([]);
    }
  }, [user]); // Re-fetch when user changes
  
  const handleRemoveFromFavorites = async (id) => {
    console.log('🗑️ Attempting to remove item:', id); // DEBUG
    
    try {
      // Optimistic update - remove from UI immediately
      setFavorites(prevFavorites => {
        const newFavorites = prevFavorites.filter(item => item._id !== id);
        console.log('📱 Updated local state, new count:', newFavorites.length); // DEBUG
        return newFavorites;
      });
      
      setRemovingItems(prev => new Set([...prev, id]));
      
      // Make API call - THIS IS WHERE IT MIGHT BE FAILING
      console.log('🌐 Making API call to remove from favorites...'); // DEBUG
      const response = await removeFromFavorites(id);
      console.log('✅ API response:', response); // DEBUG
      
      // Remove from removing set on success
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      
      console.log('🎉 Successfully removed from favorites'); // DEBUG
      
    } catch (err) {
      console.error('❌ Error removing from favorites:', err);
      console.log('🔄 Reverting optimistic update...'); // DEBUG
      
      // Revert optimistic update on error
      fetchFavorites();
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      
      // Show error message
      setError('Failed to remove item. Please try again.');
      setTimeout(() => setError(null), 5000);
    }
  };
  
  // Add this for debugging
  useEffect(() => {
    console.log('📊 Current favorites count:', favorites.length);
    console.log('👤 Current user:', user?.name || 'Not logged in');
  }, [favorites, user]);
  
  if (loading) {
    return <div>Loading favorites...</div>;
  }
  
  if (!user) {
    return (
      <div>
        <h1>Your Favorites</h1>
        <p>🔐 Please <Link to="/login">log in</Link> to view your favorites!</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div>
        <h1>Your Favorites</h1>
        <div style={{color: 'red', marginBottom: '1rem'}}>Error: {error}</div>
        <button onClick={fetchFavorites}>Try Again</button>
      </div>
    );
  }
  
  return (
    <div>
      <h1>Your Favorites</h1>

      <div className="welcome-message">
        <p>👋 Welcome, {user.name}! Here are your saved favorites.</p>
      </div>
      
      {favorites.length === 0 ? (
        <div>
          <p>You haven't added any favorites yet.</p>
          <p>Go back to <Link to="/">browse produce</Link> and click "Add to Favorites" on items you like!</p>
        </div>
      ) : (
        <div className="produce-grid">
          {favorites.map(item => (
            <article key={item._id} className="produce-card">
              <img 
                src={item.imageUrl || '/default-produce.png'} 
                alt={item.name}
                onError={(e) => {
                  e.target.src = '/default-produce.png';
                }}
              />
              <h2>{item.name}</h2>
              <p>{item.category}</p>
              <Link to={`/detail/${item._id}`} className="view-details-btn">View Details</Link>
              <button 
                onClick={() => handleRemoveFromFavorites(item._id)}
                className="remove-favorite"
                disabled={removingItems.has(item._id)}
              >
                {removingItems.has(item._id) ? 'Removing...' : 'Remove'}
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;