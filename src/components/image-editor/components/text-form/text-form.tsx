import { useStore } from '../../../../store.context';
import { HexColour } from '../../types';

export const TextForm = () => {
  const { state, changeText, changeTextColour } = useStore();
  return (
    <div>
      <input
        value={state.text}
        className="border-2 border-solid"
        onChange={(e) => changeText(e.target.value)}
        type="text"
      />
      <input
        type="color"
        value={state.textColour}
        onChange={(e) => changeTextColour(e.target.value as HexColour)}
      />
    </div>
  );
};
