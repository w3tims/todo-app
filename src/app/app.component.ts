import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { first, map, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

interface ITaskCreationData {
  text: string;
  dueDate?: number;
  other?: string;
  closed: boolean;
  creationDate?: firebase.firestore.FieldValue;
}

interface ITask extends ITaskCreationData {
  id?: string;
  creationDate?: Timestamp;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  sampleTask: ITaskCreationData = {
    text: 'TaskText',
    closed: false,
    other: 'Other text',
    creationDate: firebase.firestore.FieldValue.serverTimestamp()
  };

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
  ) {

  }


  ngOnInit() {

    // return this.updateUserData(credential.user);
  }

  startAuth() {
    const googleProvider = new auth.GoogleAuthProvider();
    const emailProvider = new auth.EmailAuthProvider();
    from(this.fireAuth.auth.signInWithPopup(googleProvider)).subscribe(
      authResult => console.log(authResult)
    );
  }

  addSampleTask() {
    this.addTask(this.sampleTask);
  }

  addTask(newTask: ITaskCreationData) {
    from(this.firestore.collection(
      'tasks'
    ).add(this.sampleTask))
      .pipe(
        map((documentReference) => {
          // const creationDate = +(new Date());
          return {
            ...newTask,
            id: documentReference.id,
            // creationDate
          };
        }),
        tap(res => console.log('newTask', res)),
      )
      .subscribe();
  }

  loadTasks() {
    this.firestore.collection(
      'tasks'
    ).snapshotChanges().pipe(
      map((records: DocumentChangeAction<ITask>[]) => records.map(
        (taskChangeAction) => {

          const newlyAddedTask: ITask = {
            ...taskChangeAction.payload.doc.data(),
            id: taskChangeAction.payload.doc.id,
          };

          console.log('date is:', newlyAddedTask.creationDate.toDate());

          return newlyAddedTask;
        }
      )),
      first(),
      tap(res => console.log('data:', res))
    ).subscribe();
  }

}
