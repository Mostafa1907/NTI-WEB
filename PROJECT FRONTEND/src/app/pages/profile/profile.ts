import { Component, signal, ChangeDetectionStrategy,inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './profile.css'
})
export class Profile {
  private auth = inject(AuthService);
 private router = inject(Router); 
  editing = signal(false);

  user = {
    name: '',
    email: '',
    phone: '',
    role: '',
    imageUrl: '',
    joined: ''
  };

  constructor() {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      const userData = JSON.parse(savedUser);

      this.user.name = userData.Name;
      this.user.email = userData.email;
      this.user.phone = userData.phone;
      this.user.role = userData.role;
      if (userData.imageUrl) {
      this.user.imageUrl =
      userData.imageUrl.startsWith('http')
      ? userData.imageUrl
      : `http://localhost:5000/api/v1/uploads/users/${userData.imageUrl}`;
}
      this.user.joined = userData.createdAt;
    }
  }
  logout(): void {
  this.auth.logout();
  this.router.navigate(['/sign-in']);
}

  toggleEdit(): void {
    this.editing.set(!this.editing());
  }
}