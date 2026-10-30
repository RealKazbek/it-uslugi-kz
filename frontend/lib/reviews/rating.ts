/** Fills the "{n}" placeholder of a dictionary template. Templates are strings so they can cross to client components. */
export function ratingText(template: string, rating: number): string {
  return template.replace('{n}', String(rating));
}
