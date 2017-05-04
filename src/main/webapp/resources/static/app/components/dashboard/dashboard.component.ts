import { Component, OnInit } from '@angular/core';

import { Dashboard } from './dashboard.js';
import { DashboardService } from './dashboard.service.js';


import { Dashlet } from './dashlet.js';
import { DashletService } from './dashlet.service.js';

@Component({
    selector: 'dashboard',
    styles:[
        '.dropIn { opacity: 0.5;}',
        ],
    templateUrl: 'app/components/dashboard/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    public columnCounter : number = 0;
    errorMessage: string;

    dashboards: Dashboard[];
    selectedDashlets: Dashlet[];
    selectedDashboard:Dashboard;

    public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData:number[] = [350, 450, 100];
    public doughnutChartType:string = 'doughnut';

    public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];
    private draggedItemid:Number=0;
    private dropAreaItemid:Number=0;
    constructor(private _dashboardService: DashboardService, private _dashletService: DashletService) {

    }

    ngOnInit(): void {
        this._dashboardService.getDashboards()
                .subscribe(dashboards => this.dashboards = dashboards,
                           error => this.errorMessage = <any>error);
        this.findDashlets(1);

    }

    onDrag(draggEvent:DragEvent,dashlet:Dashlet):void{
        draggEvent.dataTransfer.setData("text", dashlet.id+"");
        this.draggedItemid=dashlet.id;
    }

    onDragEnter(draggEvent:DragEvent,dashlet:Dashlet):void{
        this.dropAreaItemid=dashlet.id;
        if(dashlet.id!==this.draggedItemid){//&& this.dropAreaItemid!==dashlet.id
            let element = $("."+dashlet.id+"-dashlet");
            element.addClass("dropIn");
        }
    }

    onDragleave(draggEvent:Event,dashlet:Dashlet):void{
        if(dashlet.id!==this.dropAreaItemid ){
            let element = $("."+dashlet.id+"-dashlet");
            element.removeClass("dropIn");
        }
    }

    onDrop(draggEvent:DragEvent,dashlet:Dashlet):void{
        let dropedDashletId:String = draggEvent.dataTransfer.getData("text");
        let dropedInZoneId:String=dashlet.id+""; 
        console.log(dropedDashletId); 
        this.swapDashlet(dropedDashletId,dropedInZoneId);
    }

    onDragOver(draggEvent:DragEvent,dashlet:Dashlet):void{
        let dragedDashlet=this.getDashletById(this.draggedItemid+"");
        if(dashlet.id!==this.draggedItemid && dragedDashlet.size==dashlet.size){
            draggEvent.preventDefault();
        }
    }

    onDragEnd(draggEvent:DragEvent,dashlet:Dashlet):void{
        console.log("dragEnd");
        $(".dropIn").each(function(index){
            $(this).removeClass("dropIn");
        });
    }

    onChangeDashboard(dashboard:Dashboard) {
        this.selectedDashboard = dashboard;
        this.findDashlets(dashboard.id);
    }

    findDashlets(dashboardId:number): void {
        this._dashletService.getDashlets(dashboardId)
                        .subscribe(dashlets => this.selectedDashlets = dashlets,
                                error => this.errorMessage = <any>error);
    }
    
    private swapDashlet(firstDashletId:String,secondDashletId:String): void {
        let dropedElement=$("."+firstDashletId+"-dashlet");
        let dropedInZoneElement=$("."+secondDashletId+"-dashlet");

        let dropedElementClone=dropedElement.clone(true,true);
        let dropedInZoneElementClone=dropedInZoneElement.clone(true,true);
        
        dropedElement.replaceWith(dropedInZoneElementClone);
        dropedInZoneElement.replaceWith(dropedElementClone);

        this.attacheDragDropEvent(dropedInZoneElementClone,this.getDashletById(secondDashletId));
        this.attacheDragDropEvent(dropedElementClone,this.getDashletById(firstDashletId));  
    }

    private getDashletById(dashletId:String):Dashlet{
        return this.selectedDashlets.find(dashlet => dashlet.id+""==dashletId);
    }

    private attacheDragDropEvent(DomObject:JQuery,dashlet:Dashlet){
        var objectThis=this;
        DomObject.unbind();
        DomObject.bind({
            dragstart: function(event:JQueryEventObject){
                objectThis.onDrag(event.originalEvent as DragEvent,dashlet);
            },
            dragenter:function(event:JQueryEventObject){
                objectThis.onDragEnter(event.originalEvent as DragEvent,dashlet);
            },
            dragleave:function(event:JQueryEventObject){
                objectThis.onDragleave(event.originalEvent as DragEvent,dashlet);
            },
            dragover:function(event:JQueryEventObject){
                objectThis.onDragOver(event.originalEvent as DragEvent,dashlet);
            },
            drop:function(event:JQueryEventObject){
                objectThis.onDrop(event.originalEvent as DragEvent,dashlet);
                objectThis.onDragEnd(event.originalEvent as DragEvent,dashlet);
            }
        });
    }
}
