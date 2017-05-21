import { Document } from './document';
import { Recipient } from './recipient';

export class SignDocument {

  id?: number;
  status?: string;
  emailSubject: string;
  emailContent: string;
  creationDate?: string;
  updateDate?: string;
  documents?: Document[] = new Array<Document>();;
  recipients?: Recipient[] = new Array<Recipient>();
}