import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  RouterEvent,
  NavigationCancel
} from '@angular/router';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading: boolean;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessagesDisplayed() {
    return this.messageService.isDisplayed;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkEvent(routerEvent);
    });
  }

  checkEvent(routerEvent: RouterEvent) {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  displayMessages() {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessage() {
    this.router.navigate([{ outlets: { popup: null} }]);
    this.messageService.isDisplayed = false;
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigateByUrl('/welcome');
  }
}
