import {  PipeTransform, Pipe } from '@angular/core';
import { Dashboard } from './dashboard';

@Pipe({
    name: 'dashboardFilter'
})
export class DashboardFilterPipe implements PipeTransform {

    transform(value: Dashboard[], filterBy: string): Dashboard[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((dashboard: Dashboard) =>
            dashboard.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
