import { HexColour } from '../types';

export type ChangeTextAction = {
  type: 'CHANGE_TEXT';
  data: { text: string };
};

export type ChangeTextColourAction = {
  type: 'CHANGE_TEXT_COLOUR';
  data: { colour: HexColour };
};

export type ChangeColours = {
  type: 'CHANGE_COLOURS';
  data: { colours: HexColour[] };
};

export type ChangePreset = {
  type: 'CHANGE_PRESET';
  data: { text: string; colours: HexColour[] };
};

export type ChangeTextUppercase = {
  type: 'CHANGE_TEXT_UPPERCASE';
  data: { isUppercase: boolean };
};

export type Action =
  | ChangeTextAction
  | ChangeTextColourAction
  | ChangeColours
  | ChangePreset
  | ChangeTextUppercase;

export type StoreState = {
  text: string;
  textColour: HexColour;
  colours: HexColour[];
  isUppercase: boolean;
};
