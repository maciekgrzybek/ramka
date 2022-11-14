import { useStore } from '../../store/store.context';
import { HexColour } from '../../types';
import { Button } from '../button/button';

type Preset = {
  text: string;
  colours: HexColour[];
};

const presets: Preset[] = [
  { text: 'siema wariacie', colours: ['#FFFB7D', '#0093E9'] },
  { text: 'elo mordo', colours: ['#FF0000', '#80D0C7'] },
];

export const Presets = () => {
  const { setPreset } = useStore();

  const handleClick = (preset: Preset) => {
    setPreset(preset.colours, preset.text);
  };
  return (
    <>
      <h2 className="mb-1 block text-base font-small text-gray-600">Presets</h2>
      <ul className="flex flex-col gap-y-2">
        {presets.map((preset) => (
          <li key={preset.text} className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <>
                <span className="mr-2 text-gray-500">{preset.text}</span>
                {preset.colours.map((colour) => (
                  <span
                    className="w-5 h-5 rounded-full block"
                    style={{ backgroundColor: colour }}
                  />
                ))}
              </>
            </span>
            <Button onClick={() => handleClick(preset)} variant="secondary">
              Apply preset
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};
