import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export function PersonBlock({ heading, name, role, facts }: { heading: string; name: string; role: string; facts: string[] }) {
  return (
    <Section labelledBy="who">
      <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <h2 id="who" className="text-2xl">{heading}</h2>
        <div className="space-y-2">
          <p>
            <strong>{name}</strong>, {role}.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
