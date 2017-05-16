export class PrepareFormData {
    status: string = '';
    emailSubject : string = '';
    emailContent : string = '';
    documents: Document[] = [];
    recipients: any = null;

    clear() {
        this.status = '';
        this.emailSubject = '';
        this.emailContent= '';
        this.documents = [];
        this.recipients = null;
    }
}