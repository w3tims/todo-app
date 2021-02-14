import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoPageComponent } from './todo-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TodoPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: TodoPageComponent,
    }])
  ]
})
export class TodoPageModule { }
