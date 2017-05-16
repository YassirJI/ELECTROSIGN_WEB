import { Document } from './document';
import { Recipient } from './recipient';

export interface SignDocument {

  id?: number;
  status?: string;
  emailSubject: string;
  emailContent: string;
  creationDate?: string;
  updateDate?: string;
  documents?: Document[];
  recipients?: Recipient[];
}