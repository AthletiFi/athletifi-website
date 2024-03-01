import { Attributes } from '@/types/Dashboard.type';

export interface LegendEventType extends EventTarget {
  textContent?: Attributes | undefined;
}

export interface ILegendMouseEvent<T extends EventTarget> {
  readonly target: T | null;
}
