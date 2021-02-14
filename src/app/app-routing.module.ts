import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteEnum } from './typings/enums/route.enum';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: RouteEnum.Login,
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: RouteEnum.Dashboard,
        loadChildren: () => import('./pages/dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: RouteEnum.Todo,
        loadChildren: () => import('./pages/todo-page/todo-page.module').then(m => m.TodoPageModule),
        canLoad: [AuthGuard]
      }
    ],
  },
  // {
  //   path: '**',
  //   redirectTo: RouteEnum.Dashboard,
  //   pathMatch: 'full',
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
