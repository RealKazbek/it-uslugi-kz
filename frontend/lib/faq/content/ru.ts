import type { FaqGroup } from '../site';
import { languagesBotsRu } from './ru/languages-bots';
import { moneyTimeRu } from './ru/money-time';
import { processAfterRu } from './ru/process-after';
import { rightsRemoteRu } from './ru/rights-remote';
import { studyRu } from './ru/study';

export const FAQ_RU: FaqGroup[] = [...moneyTimeRu, ...processAfterRu, ...rightsRemoteRu, ...languagesBotsRu, ...studyRu];
