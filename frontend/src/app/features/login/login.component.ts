import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { LoginModel } from '../../models/login.model';
import { CommonModule } from '@angular/common';  // Ajouter CommonModule
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //standalone: true,  // Assurez-vous que le composant est déclaré comme standalone
  imports: [CommonModule,ReactiveFormsModule ]  // Ajouter CommonModule dans les imports
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Rediriger si déjà connecté
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginData: LoginModel = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Une erreur est survenue lors de la connexion';
      }
    });
  }

  forgotPassword(): void {
    const email = this.loginForm.get('username')?.value;
    if (email) {
      this.authService.forgotPassword(email).subscribe({
        next: () => {
          alert('Un email de récupération a été envoyé à votre adresse email.');
        },
        error: (error) => {
          alert(error.error?.message || 'Une erreur est survenue lors de l\'envoi de l\'email de récupération.');
        }
      });
    } else {
      alert('Veuillez entrer votre adresse email avant de demander la récupération du mot de passe.');
    }
  }
}
