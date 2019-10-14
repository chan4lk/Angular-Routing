import { Injectable } from '@angular/core';

import { User } from './user';
import { MessageService } from '../messages/message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  constructor(private messageService: MessageService, private router: Router) { }

  login(userName: string, password: string): void {
    if (!userName || !password) {
      this.messageService.addMessage('Please enter your userName and password');
      return;
    }
    if (userName === 'admin') {
      this.currentUser = {
        id: 1,
        userName: userName,
        isAdmin: true
      };
      this.messageService.addMessage('Admin login');
      this.router.navigate(['/products']);
      return;
    }
    this.currentUser = {
      id: 2,
      userName: userName,
      isAdmin: false
    };
    this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
    this.router.navigate(['/products']);
  }

  logout(): void {
    this.currentUser = null;
  }
}
