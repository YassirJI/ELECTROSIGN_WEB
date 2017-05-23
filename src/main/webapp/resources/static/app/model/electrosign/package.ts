import { Document } from './document';
import { Recipient } from './recipient';

export class Package {

  guid?: number;
  status?: string;
  emailSubject: string;
  emailContent: string;
  creationDate?: string;
  updateDate?: string;
  documents?: Document[] = [];
  recipients?: Recipient = new Recipient();
}