import { Component, OnInit }  from '@angular/core';

import { Package } from '../../../model/electrosign/package';
import { SignService } from '../../../services/electrosign/sign.service';

@Component({
    templateUrl: './package-list.component.html'
})
export class PackageListComponent implements OnInit {
    listFilter: string;
    errorMessage: string;

    packages: Package[];

    constructor(private _signService: SignService) {

    }

    ngOnInit(): void {
        this._signService.getPackages()
                .subscribe(packages => this.packages = packages,
                           error => this.errorMessage = <any>error);
    }
}
