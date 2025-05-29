import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  errorMessage = '';
  loading = false;
  returnUrl: string = '/cliente';
  private loginSubscription?: Subscription;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    // Pega a URL de retorno dos query params ou usa o padrão
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cliente';
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const { email, password } = this.loginForm.value;
      
      this.loginSubscription = this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginWithGoogle(): void {
    this.loading = true;
    this.errorMessage = '';

    this.loginSubscription = this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    });
  }

  forgotPassword(): void {
    const email = this.loginForm.get('email')?.value;
    if (!email) {
      this.errorMessage = 'Por favor, informe seu e-mail para recuperar a senha';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.sendPasswordReset(email).subscribe({
      next: () => {
        this.errorMessage = 'Email de recuperação de senha enviado. Por favor, verifique sua caixa de entrada.';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    });
  }
}