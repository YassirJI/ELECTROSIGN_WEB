import { Injectable } from '@angular/core';

import { Package } from '../../model/electrosign/package';
import { Recipient } from '../../model/electrosign/recipient';
import { Signer } from '../../model/electrosign/signer';
import { Document } from '../../model/electrosign/document';
import { Tabs } from '../../model/electrosign/tabs';

@Injectable()
export class PreparePackageFormDataService {

    private packageSign: Package = new Package();
    private isRecipientFormValid: boolean = false;
    private isEmailFormValid: boolean = false;

    getPackage(): Package {
        return this.packageSign;
    }

    setEmailData(data: any) {
        this.isEmailFormValid = true;
        this.packageSign.emailSubject = data.emailSubject;
        this.packageSign.emailContent = data.emailContent;
    }
    
    setUploadedPackageDocuments(files: any[]) {
        var documents : Document[] = [];
        files.forEach(file => {
            var document : Document = new Document(file.name, file);
            documents.push(document);
        });
        this.packageSign.documents = documents;
    }

    setRecipientsData(data: any[]) {
        this.packageSign.recipients.signers = [];
        this.isRecipientFormValid = true;
        data.forEach(recipientData => {
            var signer : Signer = { recipientId:1, name: recipientData.name, email:recipientData.email, tabs : new Tabs()};
            this.packageSign.recipients.signers.push(signer);
        });
    }

    resetPrepareFormData(): Package {
        this.packageSign = new Package();
       return this.packageSign;
    }

    isFormValid() {
        return this.isEmailFormValid ;
    }
}