import { Ticket } from './ticket';
export interface Driver {
  name: string;
  tickets: Ticket[];
  pay: number;
}
