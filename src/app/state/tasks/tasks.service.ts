import { Injectable } from '@angular/core';
import { ITask } from '../../typings/interfaces/task.interface';
import { first, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { ITaskServer } from '../../typings/interfaces/task-server.interface';
import { ITaskCreate } from '../../typings/interfaces/task-create.interface';
import * as firebase from 'firebase';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable({
  providedIn: 'root'
})
export class TasksService {



  constructor(
    private firestore: AngularFirestore,
  ) {}

  loadTasks(): Observable<ITask[]> {
    return this.firestore.collection('tasks')
      .snapshotChanges()
      .pipe(
        map((changes: DocumentChangeAction<ITaskServer>[]) => changes.map(
          change => this.getTaskFromDocumentChange(change)
        )),
        first(),
      );
  }

  deleteTask(id: string): Observable<any> {
    return from(this.firestore.collection('tasks')
        .doc(id)
        .delete()
    ).pipe(
      first()
    );
  }

  createTask(task: ITaskCreate): Observable<ITask> {

    return from(this.firestore.collection('tasks')
      .add({ ...task, creationDate: firebase.firestore.FieldValue.serverTimestamp() }))
      .pipe(
        switchMap(documentReference => from(
          this.firestore.collection<ITask>('tasks')
            .doc(documentReference.id).get()
          )
        ),
        map((documentSnapshot: DocumentSnapshot<ITaskServer>) => this.getTaskFromDocumentSnapshot(documentSnapshot)),
        first(),
      );
  }

  updateTask(task: ITask) {
    const { id, creationDate, ...taskUpdateData } = task;
    return from(this.firestore.collection('tasks')
      .doc(id)
      .update(taskUpdateData)
    ).pipe(
      first(),
      mapTo(task)
    );
  }

  private getTaskFromDocumentChange(documentChange: DocumentChangeAction<ITaskServer>): ITask {
    const taskServerData: ITaskServer = documentChange.payload.doc.data();
    const id = documentChange.payload.doc.id;
    return {
      id,
      ...taskServerData,
      ...taskServerData.creationDate && { creationDate: taskServerData.creationDate.toDate() },
      ...taskServerData.dueDate && { dueDate: taskServerData.dueDate.toDate() },
    };
  }

  private getTaskFromDocumentSnapshot(
    snapshot: DocumentSnapshot<ITaskServer>
  ): ITask {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
      ...data.creationDate && { creationDate: data.creationDate.toDate() },
      ...data.dueDate && { dueDate: data.dueDate.toDate() }
    };
  }

}
