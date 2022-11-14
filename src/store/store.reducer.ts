import { Action, StoreState } from './store.types';

export const mainReducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return {
        ...state,
        text: action.data.text,
      };
    case 'CHANGE_TEXT_COLOUR':
      return {
        ...state,
        textColour: action.data.colour,
      };
    case 'CHANGE_COLOURS':
      return {
        ...state,
        colours: action.data.colours,
      };
    case 'CHANGE_PRESET':
      return {
        ...state,
        colours: action.data.colours,
        text: action.data.text,
      };
  }
};
