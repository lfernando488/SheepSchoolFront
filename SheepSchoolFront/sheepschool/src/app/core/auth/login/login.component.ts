import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginFormGroup: FormGroup;
  isLoginFailed = false;
  errorMessage = '';

  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // redirect to home if already logged in
    //if (this.authService.currentUserValue) {
     // this.router.navigate(['/']);
    //}
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginFormGroup.controls; }

  onSubmit() {
    this.submitted = true;
    const val = this.loginFormGroup.value;
    // stop here if form is invalid
    if (this.loginFormGroup.invalid) {
      return;
    }

    this.loading = true;
    if (val.email && val.password) {
      this.authService.authenticate(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigateByUrl("dashboard").then(() => window.location.reload());
        },
        error => {
          this.error = error;
          this.loading = false;
        })
    }
  }
}
