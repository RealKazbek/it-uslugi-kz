import { notFound } from 'next/navigation';

/** Any unknown path under a language segment renders the localized 404 with status 404. */
export default function CatchAllPage(): never {
  notFound();
}
