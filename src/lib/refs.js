// Russian case forms for a quoted service name or a niche site, so templates never
// leave the name in the nominative after a preposition.
export const svcRef = (name) => ({
  nom: `услуга «${name}»`,
  gen: `услуги «${name}»`,
  dat: `услуге «${name}»`,
  acc: `услугу «${name}»`,
});

export const nicheRef = (forRu) => ({
  nom: `сайт для ${forRu}`,
  gen: `сайта для ${forRu}`,
  dat: `сайту для ${forRu}`,
  acc: `сайт для ${forRu}`,
});
