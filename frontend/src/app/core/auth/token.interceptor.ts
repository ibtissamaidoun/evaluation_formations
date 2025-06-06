import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
<<<<<<< HEAD
  HttpInterceptorFn
=======
>>>>>>> aa19c08d2fc8c58da9c8416822bb7f38d071b18f
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

<<<<<<< HEAD
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
=======
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
>>>>>>> aa19c08d2fc8c58da9c8416822bb7f38d071b18f
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
<<<<<<< HEAD
            Authorization: `Bearer ${token}`

=======
          Authorization: `Bearer ${token}`
>>>>>>> aa19c08d2fc8c58da9c8416822bb7f38d071b18f
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
<<<<<<< HEAD
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
=======
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

>>>>>>> aa19c08d2fc8c58da9c8416822bb7f38d071b18f
