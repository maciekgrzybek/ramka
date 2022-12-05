import { useStore } from '../../store/store.context';
import { useAnalyticsAction } from '../../use-analytics';
import { Preset } from './presets';

type Props = {
  preset: Preset;
};

export const PresetItem = ({ preset }: Props) => {
  const { setPreset } = useStore();
  const trackEvent = useAnalyticsAction('preset');
  function changePreset(preset: Preset) {
    setPreset(preset.colours, preset.text);
    trackEvent('select_preset', preset);
  }

  return (
    <li className="flex items-center ">
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
