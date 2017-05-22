import {NgModule,ViewContainerRef,Input,TemplateRef,OnInit,OnDestroy,EmbeddedViewRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

@Component({
    selector: 'p-templateLoader',
    template: ``
})
export class TemplateLoader implements OnInit, OnDestroy {
        
    @Input() template: TemplateRef<any>;
    
    @Input() data: any;
            
    view: EmbeddedViewRef<any>;
    
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        if(this.template) {
            this.view = this.viewContainer.createEmbeddedView(this.template, {
                '\$implicit': this.data
            });
        }
    }
	
    ngOnDestroy() {
		if (this.view) this.view.destroy();
	}
}

export class PrimeTemplate {
     
     @Input() type: string;
     
     @Input('pTemplate') name: string;
     
    constructor(public template: TemplateRef<any>) {}
     
     getType(): string {
         if(this.type) {
             console.log('Defining a pTemplate with type property is deprecated use pTemplate="type" instead.');
             return this.type;
         }
         else {
             return this.name;
         }
     }
 }