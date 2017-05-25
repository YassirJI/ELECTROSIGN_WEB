import { Tabs } from "./tabs";

export class Signer {

  recipientId?: number;
  name: string;
  email: string;
  tabs: Tabs = new Tabs();
}