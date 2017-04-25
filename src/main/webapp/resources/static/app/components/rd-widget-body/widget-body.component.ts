import {Component, Input} from '@angular/core';

@Component({
    selector: 'rd-widget-body',
    templateUrl: 'app/components/rd-widget-body/widget-body.component.html'
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
