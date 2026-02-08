import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgIf } from '@angular/common'; // Explicit import
//import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
 import {HttpClientModule} from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import {AuthenticationService} from './services/authentification.service';
import {Router} from '@angular/router';
import {User} from './models/user';

@Component({
  selector: 'app-root',  standalone:true,
  imports: [  
    ReactiveFormsModule,CommonModule,
   RouterOutlet,  NgIf], //HttpClientModule,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = ' RSS version 1.4';
   user: User |null  = null;
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => this.user = user);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
