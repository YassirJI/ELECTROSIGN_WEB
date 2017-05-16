import {Component, Input} from '@angular/core';

@Component({
    selector: 'rd-widget-body',
    templateUrl: './widget-body.component.html'
})
export class RdWidgetBodyComponent {
    @Input()
    loading:boolean;

    @Input()
    classes:string;

    constructor() {
        this.loading = false;
        this.classes = '';
    }
}
