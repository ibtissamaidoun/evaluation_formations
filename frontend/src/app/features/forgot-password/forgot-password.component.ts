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
<<<<<<< HEAD
  successMessage: string = ''; // Pour afficher un message de succès
  errorMessage: string = ''; // Pour afficher un message d'erreur

=======
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;
>>>>>>> aa19c08d2fc8c58da9c8416822bb7f38d071b18f

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
<<<<<<< HEAD
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
=======
      this.isSubmitting = true;
      const email = this.forgotPasswordForm.value.email;

      this.authService.forgotPassword(email).subscribe({
        next: (response) => {
          console.log('Password reset email sent');
          this.successMessage = 'Password reset email sent successfully';
          this.errorMessage = ''; // Clear error message if the request is successful
          this.isSubmitting = false;

          // Fermer automatiquement le message après 5 secondes
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        error: (error) => {
          console.error('Error sending the reset link', error);

          // Vérifier l'erreur spécifique venant de l'API
          if (error?.error?.message === 'Email does not exist in our database.') {
            this.errorMessage = 'This email is not registered in our database. Please check your email address.';
          } else if (error?.error?.message === 'The provided email is not in a valid format.') {
            this.errorMessage = 'The email provided is not in a valid format. Please enter a valid email address.';
          } else {
            this.errorMessage = 'Error sending the reset link. Please try again later.';
          }

          // Clear success message in case of error
          this.successMessage = '';
          this.isSubmitting = false;

          // Fermer automatiquement le message après 5 secondes
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      });
    } else {
      this.errorMessage = 'Please enter a valid email address before submitting the form.';
    }
  }

}
>>>>>>> aa19c08d2fc8c58da9c8416822bb7f38d071b18f
