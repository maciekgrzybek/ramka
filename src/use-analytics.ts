import { useEffect } from 'react';
import ReactGA from 'react-ga';

type EventCategory = 'image' | 'colour' | 'text' | 'preset';

type ImageAction =
  | 'drag_image'
  | 'select_image'
  | 're_drag_image'
  | 're_select_image'
  | 'move_image'
  | 'zoom_image';
type ColourAction = 'select_colour_1' | 'select_colour_2';
type TextAction = 'change_text';

type EventAction = ImageAction | ColourAction | TextAction;

export const useAnalyticsAction = (category: EventCategory) => {
  const eventTracker = (action: EventAction, label?: string) => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};

export const useAnalyticsPageView = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
};
