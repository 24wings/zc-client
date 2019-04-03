import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import "rxjs/operator/toPromise";
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
