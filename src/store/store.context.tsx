import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { HexColour } from '../types';
import { mainReducer } from './store.reducer';
import { Action, StoreState } from './store.types';

const initialState: StoreState = {
  text: '#looking for job',
  textColour: '#000',
  colours: ['#e66465', '#f6b73c'],
};

const Store = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const useStore = () => {
  const { dispatch, state } = useContext(Store);

  return {
    state,
    changeText: (text: string) =>
      dispatch({ type: 'CHANGE_TEXT', data: { text } }),
    changeTextColour: (colour: HexColour) =>
      dispatch({ type: 'CHANGE_TEXT_COLOUR', data: { colour } }),
    updateColour: (newColours: HexColour[]) => {
      return dispatch({
        type: 'CHANGE_COLOURS',
        data: { colours: newColours },
      });
    },
    setPreset: (newColours: HexColour[], text: string) => {
      return dispatch({
        type: 'CHANGE_PRESET',
        data: { colours: newColours, text },
      });
    },
  };
};

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <Store.Provider value={value}>{children}</Store.Provider>;
};

export { StoreProvider, useStore };
