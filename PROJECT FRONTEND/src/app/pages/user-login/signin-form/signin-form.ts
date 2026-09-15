import { Component, inject, signal, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  imports: [FormsModule,RouterLink],
  selector: 'app-signin-form',
  styleUrl: './signin-form.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './signin-form.html',
})
export class SigninForm {
  @ViewChild('loginForm') login!: NgForm;

  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage = signal<string>('');

  onSubmit() {
    this.errorMessage.set('');

    this.authService.signin(this.login.value).subscribe({
      next: () => {
        this.login.reset();
        const role = this.authService.getRole();
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.errorMessage.set('Failed to login, please try again');
        console.error(err);
      },
    });
  }
}