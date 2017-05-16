import {  PipeTransform, Pipe } from '@angular/core';
import { SignDocument } from '../../model/sign/sign-document';

@Pipe({
    name: 'documentFilter'
})
export class DocumentFilterPipe implements PipeTransform {

    transform(value: SignDocument[], filterBy: string): SignDocument[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((signDocument: SignDocument) =>
            signDocument.status.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
