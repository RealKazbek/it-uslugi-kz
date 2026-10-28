// Source: docs/content-config.json (person). Only facts from the content config.
import type { Lang } from '@/lib/i18n/locales';

export const person: { name: Record<Lang, string>; role: Record<Lang, string>; facts: Record<Lang, string[]> } = {
  name: { ru: 'Казбек Асанбек', kk: 'Қазбек Асанбек', en: 'Kazbek Assanbek' },
  role: {
    ru: 'фриланс full-stack разработчик из Алматы',
    kk: 'Алматыдағы фриланс full-stack әзірлеуші',
    en: 'freelance full-stack developer based in Almaty, Kazakhstan',
  },
  facts: {
    ru: ['Живу и работаю в Алматы.', 'Студент 3 курса, специальность Computer Engineering, IITU.', 'Работаю как фрилансер: общаюсь с заказчиком напрямую, без менеджеров и посредников.'],
    kk: ['Алматыда тұрамын және жұмыс істеймін.', 'IITU-дың Computer Engineering мамандығының 3-курс студентімін.', 'Фрилансер ретінде жұмыс істеймін: тапсырыс берушімен делдалсыз, тікелей сөйлесемін.'],
    en: ['I live and work in Almaty.', 'Third-year student of Computer Engineering at IITU.', 'I work as a freelancer: you talk to me directly, with no managers or middlemen.'],
  },
};
