import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;
  token: string | null = null;
  email: string | null = null;
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialize form with validators
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || null;
      this.email = params['email'] || null;

      // Remplir automatiquement l'email si présent dans le lien
      if (this.email) {
        this.resetForm.patchValue({ email: this.email });
      }

      // NE PAS afficher l'erreur immédiatement ici
      // Juste désactiver le bouton si le token est manquant
      if (!this.token) {
        this.resetForm.disable(); // Empêche de soumettre sans token
      }
    });
  }


  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const pass = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;

    if (pass !== confirm) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    return null;
  }

  // Getters for form controls - useful for template access
  get emailControl() { return this.resetForm.get('email'); }
  get passwordControl() { return this.resetForm.get('password'); }
  get confirmPasswordControl() { return this.resetForm.get('confirmPassword'); }

  // Form submission handler
  onSubmit() {
    // Clear previous messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validate form and token
    if (this.resetForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    if (!this.token) {
      this.errorMessage = 'Invalid reset link. Please request a new one.';
      return;
    }

    // Set loading state
    this.loading = true;

    const { email, password } = this.resetForm.value;

    // Call auth service
    this.authService.resetPassword(email, this.token, password).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = res.message || 'Your password has been successfully reset.';
        this.resetForm.reset();

        // Redirect to login page after delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message || 'An error occurred while resetting the password.';
      }
    });
  }

  // Helper method to get specific password validation error messages
  getPasswordErrorMessage(): string {
    const passwordControl = this.passwordControl;

    if (!passwordControl || !passwordControl.errors) return '';

    if (passwordControl.errors['required']) {
      return 'Password is required.';
    }

    if (passwordControl.errors['minlength']) {
      return 'Password must be at least 8 characters long.';
    }

    if (passwordControl.errors['pattern']) {
      return 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    return 'Invalid password.';
  }
}
