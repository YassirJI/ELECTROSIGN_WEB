
import * as $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'core-js/client/shim.min.js';
import 'zone.js/dist/zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/components/app.module';


platformBrowserDynamic().bootstrapModule(AppModule);
