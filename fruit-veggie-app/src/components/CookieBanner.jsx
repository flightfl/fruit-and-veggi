import { useState, useEffect } from 'react';

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      setVisible(true);
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setVisible(false);
  };
  
  if (!visible) return null;
  
  return (
    <div className="cookie-banner">
      <p>This site uses cookies for authentication and preferences.</p>
      <button onClick={acceptCookies}>Accept</button>
    </div>
  );
}

export default CookieBanner;