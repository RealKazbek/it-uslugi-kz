import { FORM_CHANNELS, type Channel } from '@/types/lead';

interface ChannelFieldProps {
  label: string;
  channelNames: Record<Channel, string>;
}

const OPTION_CLASS =
  'flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-lg border border-line bg-surface-100 px-3 text-base font-semibold text-ink hover:bg-surface-200 peer-checked:border-brand peer-checked:bg-brand-soft peer-focus-visible:ring-2 peer-focus-visible:ring-ring';

/** Segmented radio group for the reply channel. WhatsApp is pre-selected. */
export function ChannelField({ label, channelNames }: ChannelFieldProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="block text-sm font-semibold">{label}</legend>
      <div className="mt-1.5 flex gap-2">
        {FORM_CHANNELS.map((channel) => (
          <label key={channel} className="flex flex-1">
            <input
              type="radio"
              name="channel"
              value={channel}
              defaultChecked={channel === 'whatsapp'}
              className="peer sr-only"
            />
            <span className={OPTION_CLASS}>{channelNames[channel]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
