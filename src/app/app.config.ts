import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { customInterceptor } from './interceptors/custom.interceptor';
import { StartupService } from './core/startup.service';


export function initializeApp(startupService: StartupService): () => Promise<void> {
  return () => startupService.checkIfUserAlreadyLoggedIn();
}


export const appConfig: ApplicationConfig = {
  providers: [
        {
                provide: APP_INITIALIZER,
                useFactory: initializeApp,
                deps: [StartupService],
                multi: true
      },
      provideRouter(routes),
      provideAnimationsAsync(),
      MessageService,
      CookieService,
      importProvidersFrom(HttpClientModule),
      provideHttpClient(withInterceptors([customInterceptor])),
  ]
};
