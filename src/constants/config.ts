import { formatDate } from '@/lib/utils/formattingHelper';

export const IS_MOCK = true;

export const TEMP_TODAY = '2023-03-08';
export const TODAY = IS_MOCK ? TEMP_TODAY : formatDate(new Date());
