import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouteEnum } from '../typings/enums/route.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {

    // if (!this.fireAuth.auth.currentUser) {
    //   this.router.navigateByUrl(`/${RouteEnum.Login}`);
    //   return false;
    // }

    return true;
  }
}
