import { Bot, GraduationCap, Globe, LayoutGrid, MapPin, ShoppingCart, Sparkles, Workflow, Wrench, type LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  websites: Globe,
  ecommerce: ShoppingCart,
  bots: Bot,
  ai: Sparkles,
  automation: Workflow,
  'seo-maps': MapPin,
  support: Wrench,
  education: GraduationCap,
};

/** Icon of a catalog category; unknown slugs get a neutral grid icon. */
export function categoryIcon(slug: string): LucideIcon {
  return ICONS[slug] ?? LayoutGrid;
}
