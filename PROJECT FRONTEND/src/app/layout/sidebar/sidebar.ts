import {Component,EventEmitter,Input,Output,ChangeDetectionStrategy,OnInit} from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {

  @Input() open = false;
  @Output() closeMenu = new EventEmitter<void>();
  @Input() signedIn = false;

  userName = '';
  userImage = '';
  userRole = 'Customer';

  navItems: NavItem[] = [
    { label: 'الرئيسية', icon: 'home', path: '/' },
    { label: 'العربة', icon: 'cart', path: '/cart' },
    { label: 'الحساب', icon: 'user', path: '/profile' },
    { label: 'مساعدة', icon: 'help', path: '/help' },
  ];

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    const savedUser = localStorage.getItem('user');

    if (!savedUser) {
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      this.userName = user.name || user.Name || 'User';
      this.userRole = user.role || 'Customer';

      if (user.imageUrl) {
        this.userImage = user.imageUrl.startsWith('http')
          ? user.imageUrl
          : `http://localhost:5000/api/v1/uploads/users/${user.imageUrl}`;
      }
    } catch (error) {
      console.error('فشل تحميل بيانات المستخدم', error);
    }
  }
}