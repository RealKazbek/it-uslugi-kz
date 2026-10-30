import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import type { CategoryView } from '@/lib/catalog/localize';
import { CategoryTile } from './CategoryTile';
import { SectionHeading } from './SectionHeading';

interface CategoriesSectionProps {
  title: string;
  lead: string;
  categories: CategoryView[];
  hrefFor: (slug: string) => string;
  countLabel: (n: number) => string;
}

/** Image tiles, one per category with products. */
export function CategoriesSection({ title, lead, categories, hrefFor, countLabel }: CategoriesSectionProps) {
  return (
    <Section labelledBy="categories">
      <Container className="space-y-8">
        <SectionHeading id="categories" title={title} lead={lead} />
        <Stagger as="ul" className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <StaggerItem key={category.slug} as="li">
              <CategoryTile category={category} href={hrefFor(category.slug)} countLabel={countLabel(category.productCount)} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
