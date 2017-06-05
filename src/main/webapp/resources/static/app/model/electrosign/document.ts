export class Document {

  id?: number;
  name: string;
  content: File;

  constructor(name: string, content: File){
    this.name = name;
    this.content = content;
  }
}