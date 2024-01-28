import { User } from './User';

export interface Room {
    room: string;
    Sender: User;
    Receiver: User;
    content: string;
    createdAt: Date;
}
