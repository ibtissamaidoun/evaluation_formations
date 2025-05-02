import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , BehaviorSubject } from 'rxjs';
import { ForgotPasswordModel } from '../../models/forgot-password.model';  // Interface pour les données envoyées
import { environment } from '../../../../src/environments/environment';  // URL de l'API backend
import { catchError, tap } from 'rxjs/operators';

// Définition de la réponse attendue du backend
interface ForgotPasswordResponse {
  message: string;
  token?: string;  // Par exemple, le token ou autre donnée retournée
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  private apiUrl = `${environment.apiUrl}/auth/forgot-password`;  // L'URL de ton API backend


  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();



  constructor(private http: HttpClient) { }

  // Envoie la requête de réinitialisation de mot de passe
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
}
