import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { auth } from 'firebase';
import { from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteEnum } from '../../typings/enums/route.enum';
import { tap } from 'rxjs/operators';

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
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
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
      () => this.router.navigateByUrl(`/${RouteEnum.Dashboard}`),
    );
  }

  redirectToGoogleLogin() {
    const googleProvider = new auth.GoogleAuthProvider();
    from(this.fireAuth.auth.signInWithPopup(googleProvider))
      .pipe(
        tap(() => {
          // uh-oh
          this.ngZone.run(() => {
            this.router.navigateByUrl(`/${RouteEnum.Dashboard}`);
          });
        })
      )
      .subscribe();
  }
}
