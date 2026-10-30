import type { FaqGroup } from '../site';
import { languagesBotsKk } from './kk/languages-bots';
import { moneyTimeKk } from './kk/money-time';
import { processAfterKk } from './kk/process-after';
import { rightsRemoteKk } from './kk/rights-remote';
import { studyKk } from './kk/study';

export const FAQ_KK: FaqGroup[] = [...moneyTimeKk, ...processAfterKk, ...rightsRemoteKk, ...languagesBotsKk, ...studyKk];
