import {Component, Input} from '@angular/core';

@Component({
    selector: 'rd-widget-header',
    templateUrl: 'app/components/rd-widget-header/widget-header.component.html'
})
export class RdWidgetHeaderComponent {
    @Input()
    title:string;

    @Input()
    icon:string;

    constructor() {
        this.title = '';
        this.icon = '';
    }
}
