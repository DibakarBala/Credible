import { useEffect, useState } from 'react';

export const useMercuryo = () => {
  const [mercuryoWidget, setMercuryoWidget] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.mercuryo.io/widget.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Mercuryo) {
        setMercuryoWidget(new window.Mercuryo());
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeMercuryo = (config) => {
    if (mercuryoWidget) {
      mercuryoWidget.run(config);
    } else {
      console.error('Mercuryo widget not loaded');
    }
  };

  return { initializeMercuryo };
};