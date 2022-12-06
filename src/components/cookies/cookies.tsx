import { useEffect, useState } from 'react';
import JsCookies from 'js-cookie';
import ReactGA from 'react-ga4';
import TagManager from 'react-gtm-module';
import { Link } from '@tanstack/react-router';
import { Button } from '../button/button';

const cookiesKey = 'ramka-cookies-accepted';
const trackingDd = 'G-7K91L9964K';

export const Cookies = () => {
  const [cookiesStatus, setCookiesStatus] = useState(JsCookies.get(cookiesKey));

  useEffect(() => {
    if (cookiesStatus === 'accepted') {
      ReactGA.initialize(trackingDd);
      TagManager.initialize({ gtmId: trackingDd });
    }
  }, [cookiesStatus]);

  const handleAccept = () => {
    JsCookies.set(cookiesKey, 'accepted', { expires: 365 });
    setCookiesStatus('accepted');
  };

  if (!cookiesStatus) {
    return (
      <div className="fixed bottom left-0 bottom-0 w-full bg-primary-brand-600 text-xs text-white p-4 md:grid md:grid-cols-[2.3fr_1fr] md:gap-3 md:items-center z-50">
        <p className="mb-3 md:mb-0">
          We use cookies to measure website performance and provide insight into
          how visitors interact with our website.
        </p>
        <div className="flex gap-3 items-center md:justify-end">
          <Button onClick={handleAccept}>I'm okay with that</Button>
          <Link to="/privacy-policy">More info</Link>
        </div>
      </div>
    );
  }
  return null;
};
