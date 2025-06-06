import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Observable , BehaviorSubject } from 'rxjs';
import { ForgotPasswordModel } from '../../models/forgot-password.model';  // Interface pour les données envoyées
import { environment } from '../../../../src/environments/environment';  // URL de l'API backend
import { catchError, tap } from 'rxjs/operators';
=======
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginModel, LoginResponse } from '../../models/login.model';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';  // Importer CookieService
import { Router } from '@angular/router'; // Ajouter le Router pour la redirection
import { ForgotPasswordModel } from '../../models/forgot-password.model';
>>>>>>> aa19c08d2fc8c58da9c8416822bb7f38d071b18f

// Définition de la réponse attendue du backend
interface ForgotPasswordResponse {
  message: string;
  token?: string;  // Par exemple, le token ou autre donnée retournée
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD

  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  private apiUrl = `${environment.apiUrl}/auth/forgot-password`;  // L'URL de ton API backend


  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();



  constructor(private http: HttpClient) { }

  // Envoie la requête de réinitialisation de mot de passe
=======
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token'; // Clé pour le cookie du token
  private apiUrl = `${environment.apiUrl}/auth/forgot-password`;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const storedToken = this.cookieService.get(this.tokenKey); // Récupérer le token depuis les cookies
    if (storedToken) {
      const decodedToken = this.decodeToken(storedToken);
      if (decodedToken && decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
        // Si le token est valide, définir l'utilisateur connecté
        this.currentUserSubject.next({ token: storedToken });
      } else {
        this.logout(); // Déconnecter l'utilisateur si le token est expiré
      }
    }
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)); // Décode la partie payload du JWT
  }

  login(loginData: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, loginData).pipe(
      tap(response => {
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 30);

        if (loginData.rememberMe) {
          this.cookieService.set(this.tokenKey, response.token, expirationDate, '/', '', true, 'Strict');
        } else {
          this.cookieService.set(this.tokenKey, response.token);
        }

        this.currentUserSubject.next({ token: response.token });
        this.router.navigate(['/dashboard']);
      }),
      catchError((error) => {
        let errorMessage = 'Une erreur inconnue est survenue.';
        if (error.status === 401) {
          errorMessage = 'Identifiants incorrects.';
        } else if (error.status === 500) {
          errorMessage = 'Erreur serveur, veuillez réessayer plus tard.';
        }
        // Renvoyer l'erreur au composant
        return throwError(() => new Error(errorMessage));
      })
    );
  }


  logout(): void {
    // Supprimer le cookie du token
    this.cookieService.delete(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Rediriger vers la page de connexion après la déconnexion
  }

  getToken(): string | null {
    // Récupérer le token depuis les cookies
    return this.cookieService.get(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Vérifie si l'utilisateur est connecté
  }

>>>>>>> aa19c08d2fc8c58da9c8416822bb7f38d071b18f
  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    const forgotPasswordData: ForgotPasswordModel = { email };

    return this.http.post<ForgotPasswordResponse>(this.apiUrl, forgotPasswordData)  // Appel à l'API backend
      .pipe(
        tap((response: ForgotPasswordResponse) => {  // Définition explicite du type de réponse
          console.log('Réponse du backend :', response.message);  // Accès à la réponse
        }),
        catchError((error: any) => {  // Gestion des erreurs
          console.error('Erreur du backend', error);
          throw error;
        })
      );
  }

<<<<<<< HEAD
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
=======
  // Reset password with token
  resetPassword(email: string, token: string, newPassword: string): Observable<any> {
    const body = {
      Email: email,
      Token: token,
      NewPassword: newPassword
    };

    return this.http.post<any>(`${environment.apiUrl}/auth/reset-password`, body).pipe(
      catchError(this.handleError)
    );
  }


  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 0) {
        errorMessage = 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.';
      } else if (error.status === 404) {
        errorMessage = 'Ressource non trouvée.';
      } else if (error.status === 400) {
        // Try to get the error message from the response
        errorMessage = error.error?.message || 'Requête invalide.';
      } else if (error.status === 401) {
        errorMessage = 'Non autorisé. Veuillez vous connecter.';
      } else if (error.status === 500) {
        errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
      }

      // If there's a specific message in the error response, use it
      if (error.error && typeof error.error.message === 'string') {
        errorMessage = error.error.message;
      }
    }

    // Log the error for debugging
    console.error('An error occurred:', error);

    // Return an observable with a user-facing error message
    return throwError(() => new Error(errorMessage));
  }


>>>>>>> aa19c08d2fc8c58da9c8416822bb7f38d071b18f
}
