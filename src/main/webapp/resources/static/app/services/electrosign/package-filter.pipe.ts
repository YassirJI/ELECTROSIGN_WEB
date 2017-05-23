import {  PipeTransform, Pipe } from '@angular/core';
import { Package } from '../../model/electrosign/package';

@Pipe({
    name: 'packageFilter'
})
export class PackageFilterPipe implements PipeTransform {

    transform(value: Package[], filterBy: string): Package[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((packageSign: Package) =>
            packageSign.status.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
