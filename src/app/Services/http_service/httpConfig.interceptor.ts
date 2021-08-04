import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
declare var $: any;
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  loaderToShow: any;
  constructor() { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('pspkey'); // "my-token-string-from-server";

    // Authentication by setting header with token value
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + token,
        },
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json',
        },
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });
    this.showloader(); // Loader
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // tslint:disable-next-line:no-console
          console.log('event--->>>', event);
        }
        this.dismissloader(); // Loader
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      }));
  }


  generateJwtToken() {
    // create token that expires in 15 minutes
    const tokenPayload = { exp: Math.round(new Date(Date.now() + 15 * 60 * 1000).getTime() / 1000) };
    return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;
  }

  // // Loader Set
  //     showLoader() {
  //       this.loaderToShow = this.loadingController.create({
  //         message: 'Processing Server Request'
  //       }).then((res) => {
  //         res.present();

  //         res.onDidDismiss().then((dis) => {
  //           console.log('Loading dismissed!');
  //         });
  //       });
  //       this.hideLoader();
  //     }

  //     hideLoader() {
  //         this.loadingController.dismiss();
  //        // this.loadingController=null
  //     }





  // My Custom

  showloader() {
    // tslint:disable-next-line:ban
    $('#preloader-active').css('display', 'block');
  }

  dismissloader() {
    setTimeout(() => {
      // tslint:disable-next-line:ban
      $('#preloader-active').css('display', 'none');
    }, 1000);
  }



  // Loader Set ends


}
