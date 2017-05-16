import { Injectable }                        from '@angular/core';

import { PrepareFormData }       from './prepareFormData.model';

import { SignDocument } from '../../../../model/sign/sign-document';

@Injectable()
export class PrepareFormDataService {

    private formData: PrepareFormData = new PrepareFormData();
    private isRecipientFormValid: boolean = false;
    private isEmailFormValid: boolean = false;

    getSignDocument(): SignDocument {
        var signDocument: SignDocument = {
            emailSubject: this.formData.emailSubject,
            emailContent: this.formData.emailContent
        };
        return signDocument;
    }

    setSignDocument(data: SignDocument) {
        this.isEmailFormValid = true;
        this.formData.emailSubject = data.emailSubject;
        this.formData.emailContent = data.emailContent;
    }

    getEmailSubject() : string {
        return this.formData.emailSubject;
    }
    
    setEmailSubject(data: string) {
        this.isEmailFormValid = true;
        this.formData.emailSubject = data;
    }

    getEmailContent() : string { 
        return this.formData.emailContent;
    }
    
    setEmailContent(data: string) {
        this.isEmailFormValid = true;
        this.formData.emailContent = data;
    }


    getFormData(): PrepareFormData {
        return this.formData;
    }

    resetFormData(): PrepareFormData {
        this.formData.clear();
       // this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isEmailFormValid ;
    }
}