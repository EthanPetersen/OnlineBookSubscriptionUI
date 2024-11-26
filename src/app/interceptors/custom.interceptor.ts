import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { LoadingService } from '../shared/loader/loading.service';
import { MessageService } from 'primeng/api';
import { catchError, finalize, throwError } from 'rxjs';

const env = environment;

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService = inject(LoadingService);
  const cookieService = inject(CookieService);
  const messageService = inject(MessageService);


    loadingService.isLoadingSpinner.emit(true);

  if(!environment.production){
      var token = cookieService.get("EPBookSubscription")

      if(token){
          req = req.clone({
                setHeaders:{
                  Authorization:'Bearer '+token
                }
      });
      }
  }


  req = req.clone({
            url: `${env.API}${req.url}`,
            withCredentials: true
        });


  return next(req).pipe(
    catchError((error) => {
           messageService.add({severity:'error',
              summary:`Error - ${error?.error?.status ?? error.status}`,
              detail:`${error?.error?.detail}`,
              life: 5000
          });

        return throwError(()=> error.message);
      }),
      finalize(()=>{
       loadingService.isLoadingSpinner.emit(false);
      })
  );;
};
