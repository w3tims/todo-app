import { ITaskCreate } from './task-create.interface';

export interface ITask extends ITaskCreate {
    id?: string;
    creationDate?: Date;
}
