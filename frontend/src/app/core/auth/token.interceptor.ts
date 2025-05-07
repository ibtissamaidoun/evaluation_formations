import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Si l'utilisateur n'est pas authentifié, on le déconnecte et on redirige vers la page de connexion
          this.authService.logout();
          if (this.router.url !== '/login') {
            this.router.navigate(['/login']);
          }
        } else if (error.status === 500) {
          // Par exemple, gestion d'une erreur serveur
          console.error("Erreur serveur :", error.message);
        }
        // Retourner l'erreur pour que l'application continue de fonctionner normalement
        return throwError(() => error);
      })
    );

  }
}

