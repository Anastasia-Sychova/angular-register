import { AuthService } from '@services/auth.service';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authUrl = 'http://localhost:1234';

    constructor(
        private auth: AuthService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authToken: string = this.auth.getAuthorizationToken();

      const authReq = req.clone({
        url: `${this.authUrl}/${req.url}`,
        headers: req.headers.set('Token', authToken)
      });

      return next.handle(authReq);
    }
}
