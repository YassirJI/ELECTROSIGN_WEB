import { Injectable } from '@angular/core';

import { SignDocument } from '../../../../model/sign/sign-document';
import { Recipient } from '../../../../model/sign/recipient';

@Injectable()
export class PrepareFormDataService {

    private signDocument: SignDocument = new SignDocument();
    private isRecipientFormValid: boolean = false;
    private isEmailFormValid: boolean = false;

    getSignDocument(): SignDocument {
        return this.signDocument;
    }

    setEmailData(data: any) {
        this.isEmailFormValid = true;
        this.signDocument.emailSubject = data.emailSubject;
        this.signDocument.emailContent = data.emailContent;
    }

    setRecipientsData(data: any[]) {
        this.signDocument.recipients = [];
        this.isRecipientFormValid = true;
        data.forEach(recipientData => {
            var recipient : Recipient = { name: recipientData.name, email:recipientData.email};
            this.signDocument.recipients.push(recipient);
        });
    }

    resetPrepareFormData(): SignDocument {
        this.signDocument = new SignDocument();
       return this.signDocument;
    }

    isFormValid() {
        return this.isEmailFormValid ;
    }
}