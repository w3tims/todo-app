import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;


export interface ITaskServer {
    creationDate?: Timestamp;
    dueDate?: Timestamp;
    text: string;
    other?: string;
    closed: boolean;
}
