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

  constructor(){
    this.status = "created";
    this.creationDate = this.dateNow();
  }

  private dateNow(): string {
        let date: Date = new Date();
        return (date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate())).slice(-2));
    }
}