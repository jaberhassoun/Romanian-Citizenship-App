import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
  <div>
  <ins className="adsbygoogle"
      data-ad-client='ca-pub-7204729167245215' // replace with your AdSense client ID
      data-ad-slot='4151246731' // replace with your AdSense slot ID
      style={{ display: 'block' }}
      data-ad-format='auto'
      data-full-width-responsive="true"></ins>
   
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
  </div>
);

};

export default AdComponent;
