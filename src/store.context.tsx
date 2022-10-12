import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { HexColour } from './components/image-editor/types';

type ChangeTextAction = {
  type: 'CHANGE_TEXT';
  data: { text: string };
};

type ChangeTextColourAction = {
  type: 'CHANGE_TEXT_COLOUR';
  data: { colour: HexColour };
};

type ChangeColours = {
  type: 'CHANGE_COLOURS';
  data: { colours: HexColour[] };
};

type Action = ChangeTextAction | ChangeTextColourAction | ChangeColours;

type StoreState = {
  text: string;
  textColour: HexColour;
  colours: HexColour[];
};

const initialState: StoreState = {
  text: '#looking for job',
  textColour: '#000',
  colours: ['#e66465', '#f6b73c'],
};

const mainReducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return {
        ...state,
        text: action.data.text,
      };
    case 'CHANGE_TEXT_COLOUR':
      return {
        ...state,
        text: action.data.colour,
      };
    case 'CHANGE_COLOURS':
      return {
        ...state,
        colours: action.data.colours,
      };
  }
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
    updateColour: (newColour: HexColour, index: number) => {
      const newColours = state.colours.map((prevColour, i) =>
        i === index ? newColour : prevColour
      );
      return dispatch({
        type: 'CHANGE_COLOURS',
        data: { colours: newColours },
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
