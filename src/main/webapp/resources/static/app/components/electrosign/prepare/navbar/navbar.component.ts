import { Component, Input } from '@angular/core';

@Component ({
    selector: 'prepare-navbar'
    ,templateUrl: './navbar.component.html'
})

export class NavbarComponent {
    @Input()
    private activeStep:string;

    isPrepareStep(): boolean {
        if('prepare' === this.activeStep){
            return true;
        }
        return false;
    }

    isMarkAndSendStep(): boolean {
        if('markAndSend' === this.activeStep){
            return true;
        }
        return false;
    }

    isCompletedStep(): boolean {
        if('completed' === this.activeStep){
            return true;
        }
        return false;
    }
}