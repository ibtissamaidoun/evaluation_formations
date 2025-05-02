import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  successMessage: string = ''; // Pour afficher un message de succès
  errorMessage: string = ''; // Pour afficher un message d'erreur


  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      
      this.authService.forgotPassword(email).subscribe({
        next: (response) => {
          console.log('Email de réinitialisation envoyé');
          // this.router.navigate(['/login']);
          this.successMessage = 'Password reset email sent successfully';
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi du lien de réinitialisation', error);
          this.errorMessage = 'Error sending the reset link .';
          this.successMessage = '';
        }
      });
      
    }
  }
}