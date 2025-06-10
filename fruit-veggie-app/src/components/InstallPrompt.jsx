import { useState, useEffect } from 'react';

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if user already dismissed the prompt
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed) {
      return; // Don't show if previously dismissed
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
    // Remember that user dismissed it
    localStorage.setItem('installPromptDismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="install-prompt">
      <div className="install-prompt-content">
        <span>📱</span>
        <div className="install-text">
          <strong>Install Produce Explorer</strong>
          <p>Get quick access to nutrition info and comparisons!</p>
        </div>
        <div className="install-actions">
          <button onClick={handleInstall} className="install-button">
            Install
          </button>
          <button onClick={handleDismiss} className="dismiss-button">
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallPrompt;