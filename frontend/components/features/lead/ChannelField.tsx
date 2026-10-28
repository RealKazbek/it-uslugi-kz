import { FieldShell, INPUT_CLASS } from './FieldShell';
import { CHANNELS } from '@/types/lead';

interface ChannelFieldProps {
  id: string;
  label: string;
  channelNames: Record<(typeof CHANNELS)[number], string>;
}

export function ChannelField({ id, label, channelNames }: ChannelFieldProps) {
  return (
    <FieldShell id={id} label={label}>
      <select id={id} name="channel" defaultValue="whatsapp" className={INPUT_CLASS}>
        {CHANNELS.map((channel) => (
          <option key={channel} value={channel}>
            {channelNames[channel]}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
