import { cartHandlers } from './cartHandlers';
import { orderSheetHandlers } from './orderSheetHandlers';

export const handlers = [...cartHandlers, ...orderSheetHandlers];
