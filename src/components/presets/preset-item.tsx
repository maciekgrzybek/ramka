import { useStore } from '../../store/store.context';
import { Preset } from './presets';

type Props = {
  preset: Preset;
};

export const PresetItem = ({ preset }: Props) => {
  const { setPreset } = useStore();
  const changePreset = (preset: Preset) => {
    setPreset(preset.colours, preset.text);
  };

  return (
    <li key={preset.text} className="flex items-center ">
      <button
        className="flex items-center  px-3 py-2 hover:bg-primary-brand-100 gap-px w-full"
        onClick={() => changePreset(preset)}
      >
        <>
          {preset.colours.map((colour) => (
            <span
              key={`${colour}-${preset.text}`}
              className="w-3 h-3 rounded-full block"
              style={{ backgroundColor: colour }}
            />
          ))}
          <span className="ml-2">{preset.text}</span>
        </>
      </button>
    </li>
  );
};
