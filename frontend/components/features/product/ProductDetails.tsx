import { EstimateCard } from './EstimateCard';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export interface ProductDetailsProps {
  forWhomTitle: string;
  forWhom: string;
  notIncludedTitle: string;
  notIncludedLead: string;
  notIncluded: string[];
  estimate: {
    title: string;
    items: string[];
    totalLabel: string;
    totalText: string;
    timelineText: string;
    priceNote: string;
  };
}

/** Who it is for, what is not included, and the receipt-style estimate. */
export function ProductDetails(props: ProductDetailsProps) {
  const { estimate } = props;
  return (
    <Section>
      <Container className="grid gap-10 md:grid-cols-[1fr_1fr]">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl">{props.forWhomTitle}</h2>
            <p className="max-w-prose">{props.forWhom}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl">{props.notIncludedTitle}</h2>
            <p className="text-muted">{props.notIncludedLead}</p>
            <ul className="list-disc space-y-1 pl-5">
              {props.notIncluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <EstimateCard
          title={estimate.title}
          items={estimate.items}
          totalLabel={estimate.totalLabel}
          totalText={estimate.totalText}
          timelineText={estimate.timelineText}
          footer={<p className="mt-4 text-sm text-muted">{estimate.priceNote}</p>}
        />
      </Container>
    </Section>
  );
}
