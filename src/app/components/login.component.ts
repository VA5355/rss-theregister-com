import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgIf } from '@angular/common'; // Explicit import
//import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
 //import {HttpClientModule} from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { NonNullableFormBuilder } from '@angular/forms';

import {AuthenticationService} from '../services/authentification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { JsonPipe } from '@angular/common'; // Import the JsonPipe
@Component({
  selector: 'app-login', standalone:true,
    imports: [  
    ReactiveFormsModule, CommonModule, JsonPipe,
   RouterOutlet,   NgIf],// HttpClientModule,
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public ui = {
    submitted: false,
    processing: false,
    error: '',
    returnUrl: ''
  }   ;  // = {};
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] })
  });
     ; // = inject(NonNullableFormBuilder);
       /** <{
    email: FormControl<string>;
    password: FormControl<string>;
  }>  */

  get form() {
    return this.loginForm!.controls;
  }

  constructor(private formBuilder: NonNullableFormBuilder, private route: ActivatedRoute, private router: Router,
              private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // get return url from route parameters or default to '/'
    this.ui.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.ui.submitted = true;

    if (this.loginForm!.invalid) {
      return false;
    }

    this.ui.processing = true;
    this.authenticationService.login(this.form['email'].value, this.form['password'].value)
      .pipe(first())
      .subscribe(data => this.router.navigate([this.ui.returnUrl]),
        error => {
          this.ui.error = error.error;
          this.ui.processing = false;    return false;
        });

        return false;
  }
}
