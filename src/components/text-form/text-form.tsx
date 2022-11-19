import { useStore } from '../../store/store.context';
import { HexColour } from '../../types';
import { ColourInput } from '../colour-input/colour-input';
import { Label } from '../label/labelt';
import { TextInput } from '../text-input/text-input';

export const TextForm = () => {
  const { state, changeText, changeTextColour } = useStore();

  return (
    <fieldset>
      <Label>Your frame text and color</Label>
      <div className="flex items-center">
        <div className="mr-3 w-full">
          <TextInput
            text={state.text}
            label="Your text"
            hideLabel
            handleChange={(e) => changeText(e.target.value)}
          />
        </div>
        <div className="relative w-8 h-8">
          <ColourInput
            colour={state.textColour}
            handleChange={(e) => changeTextColour(e.target.value as HexColour)}
          />
        </div>
      </div>
    </fieldset>
  );
};
