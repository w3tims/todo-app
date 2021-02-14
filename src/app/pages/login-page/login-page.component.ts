import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { auth } from 'firebase';
import { from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RouteEnum } from '../../typings/enums/route.enum';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  emailLoginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  emailLoginFormSubmit() {
    if (this.emailLoginForm.invalid) {
      this.emailLoginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.emailLoginForm.value;
    this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(
      next => { this.router.navigateByUrl(`/${RouteEnum.Dashboard}`); },
      err => {},
    );
  }
}
