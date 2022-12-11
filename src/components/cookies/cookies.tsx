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
      <div className="text-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4/5 max-w-xl text-sm bg-white flex flex-col justify-center text-black-brand rounded-lg shadow-xl py-20 px-6 md:px-10 z-50">
        <h2 className="text-3xl font-bold mb-4">Cookies 🍪</h2>
        <p className="mb-6">
          We use cookies to measure the performance and provide insight into how
          visitors interact with RAMKA. <br />
          <strong>Do not worry though! We just use basic analytics.</strong>
        </p>
        <div className="flex gap-3 items-center flex-col md:flex-row md:self-center md:gap-6">
          <Button onClick={handleAccept}>I'm okay with that</Button>
          <Link to="/privacy-policy">More info</Link>
        </div>
      </div>
    );
  }
  return null;
};
