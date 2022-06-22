import { EventTypes } from './eventType';

export interface ToastEvent {
  type: EventTypes;
  title: string;
  message: string;
}
