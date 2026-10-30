import type { FaqGroup } from '../site';
import { languagesBotsEn } from './en/languages-bots';
import { moneyTimeEn } from './en/money-time';
import { processAfterEn } from './en/process-after';
import { rightsRemoteEn } from './en/rights-remote';
import { studyEn } from './en/study';

export const FAQ_EN: FaqGroup[] = [...moneyTimeEn, ...processAfterEn, ...rightsRemoteEn, ...languagesBotsEn, ...studyEn];
