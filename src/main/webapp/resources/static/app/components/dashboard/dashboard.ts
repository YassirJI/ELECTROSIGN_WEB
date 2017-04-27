import { Dashlet } from './dashlet.js';

export interface Dashboard {

  id: number;
  name: string;
  description: string;
  creationDate: string;
  dashlets: Dashlet[];
}