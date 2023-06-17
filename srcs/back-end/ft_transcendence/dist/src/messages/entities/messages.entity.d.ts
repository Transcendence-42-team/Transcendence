import { User } from 'src/users/entities/user.entity';
import { Chanel } from 'src/chanel/entities/chanel.entity';
export declare class Message {
    id: number;
    content: string;
    sent_at: Date;
    sender: User;
    sender_id: number;
    receiver_id?: number;
    channel_id?: number;
    receiver?: User;
    channel?: Chanel;
}