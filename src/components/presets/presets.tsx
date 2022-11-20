import { useStore } from '../../store/store.context';
import { HexColour } from '../../types';
import { Button } from '../button/button';
import { Label } from '../label/labelt';

type Preset = {
  text: string;
  colours: HexColour[];
};

const presets: Preset[] = [
  { text: 'Freelance Web Developer', colours: ['#85FFBD', '#FFFB7D'] },
  { text: 'I HATE MONDAYS', colours: ['#0093E9', '#80D0C7'] },
  { text: '#Not Looking For Job', colours: ['#F4D03F', '#16A085'] },
  { text: 'Marketing Queen', colours: ['#FAD961', '#F76B1C'] },
];

export const Presets = () => {
  const { setPreset } = useStore();

  const handleClick = (preset: Preset) => {
    setPreset(preset.colours, preset.text);
  };
  return (
    <>
      <Label>Presets</Label>
      <ul className="flex flex-col gap-y-2">
        {presets.map((preset) => (
          <li key={preset.text} className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <>
                <span className="mr-2 text-black-brand-300">{preset.text}</span>
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
