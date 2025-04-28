import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
//import { authInterceptor } from './core/interceptors/http-interceptor.fn'; 
import { TokenInterceptor } from './core/auth/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/auth/auth.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true,
    },
    AuthService
  ],
  //bootstrap: [AppComponent]
})
export class AppModule { }