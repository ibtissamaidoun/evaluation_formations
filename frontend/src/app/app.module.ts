import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'
import { TokenInterceptor } from './core/auth/token.interceptor';
import { LoginComponent } from './features/login/login.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { ResetComponent } from './features/reset/reset.component';

//import { bootstrapApplication } from '@angular/platform-browser';

// Ne déclarez plus AppComponent ici car c'est un composant standalone
import { AppComponent } from './app.component';
import { AuthService } from './core/auth/auth.service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LoginComponent,
    ForgotPasswordComponent,
    ResetComponent,
    ForgotPasswordComponent,
    LoginComponent // Assurez-vous d'ajouter les composants standalone ici
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService
  ],
  //bootstrap: [AppComponent]
})
export class AppModule {}

//bootstrapApplication(AppComponent); // Utilisez bootstrapApplication pour un composant standalone
