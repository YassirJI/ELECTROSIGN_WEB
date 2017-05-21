import {EventEmitter,Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export interface Message {
    severity?: string;
    summary?: string;
    detail?: string;
    id?: any;
}
