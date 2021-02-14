import { Injectable } from '@angular/core';
import { ITask } from '../../typings/interfaces/task.interface';
import { first, map, mapTo, tap } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { ITaskServer } from '../../typings/interfaces/task-server.interface';
import { ITaskCreate } from '../../typings/interfaces/task-create.interface';

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
      .add(task))
      .pipe(
        map((documentReference) => {
          // TODO consider using switchMap to retrieve newly-created item from server
          //  with more precise creationDate but with drawback of +1 backend call
          const creationDate = new Date();
          return {
            ...task,
            id: documentReference.id,
            creationDate
          };
        }),
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
      creationDate: taskServerData.creationDate.toDate(),
    };
  }

}
