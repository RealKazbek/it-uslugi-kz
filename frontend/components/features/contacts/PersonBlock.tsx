import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

/** Who does the work: name, role and short facts, in one card. */
export function PersonBlock({ heading, name, role, facts }: { heading: string; name: string; role: string; facts: string[] }) {
  return (
    <Section labelledBy="who">
      <Container className="space-y-8">
        <h2 id="who" className="text-3xl font-extrabold">{heading}</h2>
        <Card className="max-w-prose space-y-4 p-6 md:p-8">
          <p className="text-lg">
            <strong>{name}</strong>, {role}.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </Card>
      </Container>
    </Section>
  );
}
