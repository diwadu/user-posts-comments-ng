import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap, finalize } from "rxjs/operators";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {


    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            map(event => {

                console.log('MyHttpInterceptor, map', event);
                if (event instanceof HttpResponse){
                    console.log('MyHttpInterceptor, map', event.body);
                }
                
                return event;
            }),
            catchError(error => {
                console.log('MyHttpInterceptor, error', error);
                return throwError(error);
            }),
            finalize(() => {
                console.log('MyHttpInterceptor, finalize');
            })
        );
    }
}
