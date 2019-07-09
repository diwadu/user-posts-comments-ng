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
                if (req.urlWithParams === "https://jsonplaceholder.typicode.com/posts") {
                    if (event instanceof HttpResponse) {
                        console.log('TOTAL POSTS COUNT:', event.headers.get('x-total-count'));
                        localStorage.setItem("totalPostsCount", event.headers.get('x-total-count'));
                    }
                }
                return event;
            }),
            catchError(error => {
                return throwError(error);
            }),
            finalize(() => {
            })
        );
    }
}
