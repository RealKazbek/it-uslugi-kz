import { Minus } from 'lucide-react';

export interface ProductDetailsProps {
  forWhomTitle: string;
  forWhom: string;
  notIncludedTitle: string;
  notIncludedLead: string;
  notIncluded: string[];
}

/** Who it is for, and what the price does not cover. */
export function ProductDetails(props: ProductDetailsProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-2">
        <h2 className="text-xl">{props.forWhomTitle}</h2>
        <p>{props.forWhom}</p>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl">{props.notIncludedTitle}</h2>
        <p className="text-muted-foreground">{props.notIncludedLead}</p>
        <ul className="space-y-1.5 text-muted-foreground">
          {props.notIncluded.map((item) => (
            <li key={item} className="flex gap-2">
              <Minus aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
