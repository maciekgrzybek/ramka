import { useEffect } from 'react';
import ReactGA from 'react-ga4';

type EventCategory = 'image' | 'colour' | 'text' | 'preset';

type ImageAction = 'select_image' | 're_select_image' | 'save_image';
type ColourAction = 'select_colour';
type TextAction = 'change_text' | 'change_text_colour';
type PresetAction = 'open_presets' | 'select_preset';

type EventAction = ImageAction | ColourAction | TextAction | PresetAction;

export const useAnalyticsAction = (category: EventCategory) => {
  const eventTracker = (action: EventAction, params?: any) => {
    ReactGA.event({ category, action }, params);
  };
  return eventTracker;
};

export const useAnalyticsPageView = () => {
  useEffect(() => {
    ReactGA.send('pageview');
  }, []);
};
