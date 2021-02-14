import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import { ITaskCreate } from './task-create.interface';


export interface ITaskServer extends ITaskCreate {
    creationDate?: Timestamp;
}
