import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask } from '../../../typings/interfaces/task.interface';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  text = new FormControl('', Validators.required);
  dueDate = new FormControl(null);
  other = new FormControl(null);
  closed = new FormControl(false, Validators.required);

  taskForm = new FormGroup({
    text: this.text,
    dueDate: this.dueDate,
    other: this.other,
    closed: this.closed,
  });

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask
  ) { }

  taskFormSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close({
      ...this.taskForm.value,
      ...this.data && this.data.id && { id: this.data.id }
    });
  }

  ngOnInit() {
    if (this.data) {
      this.taskForm.patchValue(this.data);
    }
  }
}
