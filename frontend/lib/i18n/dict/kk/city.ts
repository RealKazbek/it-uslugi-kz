import type { CityDict, CityFaqInput } from '../types';

function example(input: CityFaqInput): string {
  return input.example ? ` Мысалы, «${input.example.title}» үшін: ${input.example.reason}` : '';
}

export const cityKk: CityDict = {
  title: (name) => `${name} IT-қызметтер: сайттар, боттар, автоматтандыру | Perne`,
  h1: (forms) => `${forms.attr} IT-қызметтер`,
  description: (forms, min) =>
    `${forms.attr} бизнеске сайттар, Telegram-боттар және автоматтандыру. Бағасы ${min}. Қазақстан бойынша қашықтан жұмыс істейміз.`,
  intro: (context, sectors) => `${context} Қаладағы назар аударарлық салалар: ${sectors.join(', ')}.`,
  remote: 'Қазақстан бойынша қашықтан жұмыс істейміз, Алматыда жеке кездесу мүмкін.',
  focusHeading: 'Бұл қаладағы бизнеске көбіне не сай келеді',
  focusLead: 'Жергілікті салаларға ең сәйкес келетін алты өнім.',
  catalogHeading: (form) => `${form} бизнеске арналған бүкіл каталог`,
  nearbyHeading: 'Жақын қалалар',
  faqHeading: 'Жиі қойылатын сұрақтар',
  faq: (input) => [
    {
      q: `${input.loc} жұмысқа қашықтан тапсырыс беруге бола ма?`,
      a: `Иә, бәрін қашықтан жасаймыз: қоңырау, WhatsApp немесе Telegram арқылы хабарласу, экранды көрсету.${input.inPerson ? ' Алматыда жеке кездесуге болады.' : ''}`,
    },
    {
      q: `${input.attr} бизнеске көбіне не сай келеді?`,
      a: `Қаладағы салаларды ескерсек (${input.sectors.slice(0, 3).join(', ')}), көбіне мыналар сай келеді: ${input.titles.slice(0, 3).join('; ')}.${example(input)}`,
    },
    {
      q: `${input.attr} баға өзгеше ме?`,
      a: 'Жоқ, баға қалаға байланысты емес. Соңғы соманы жұмыс басталғанға дейін айтып, жазбаша келісімде бекітеміз.',
    },
  ],
};
