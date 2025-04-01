
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-ai-darkblue border-t border-ai-blue/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-ai-white text-sm md:text-base">
            Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Continuando a navigare, accetti la nostra{' '}
            <Link to="/cookie-policy" className="text-ai-blue hover:underline">
              Cookie Policy
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-ai-blue text-ai-blue hover:bg-ai-blue/10"
            onClick={() => setIsVisible(false)}
          >
            <X className="mr-2 h-4 w-4" />
            Rifiuta
          </Button>
          <Button 
            className="bg-ai-blue hover:bg-ai-purple text-white"
            onClick={acceptCookies}
          >
            Accetta tutti
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
