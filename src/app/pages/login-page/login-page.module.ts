import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from '../dashboard-page/dashboard-page.component';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: LoginPageComponent,
    }])
  ]
})
export class LoginPageModule { }
