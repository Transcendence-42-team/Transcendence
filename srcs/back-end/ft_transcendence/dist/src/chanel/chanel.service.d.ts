import { CreateChanelInput } from "./dto/create-chanel.input";
import { UpdateChanelInput } from "./dto/update-chanel.input";
import { PrismaService } from "prisma/prisma.service";
import { Chanel } from "./entities/chanel.entity";
import { UsersService } from "src/users/users.service";
export declare class ChanelService {
    private readonly prisma;
    private readonly user;
    constructor(prisma: PrismaService, user: UsersService);
    create(createChanelInput: CreateChanelInput): Promise<Error | ({
        interlocutor: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            token: string;
            state: number;
            connection_status: number;
            tfa_code: string;
            email: string;
            nickname: string;
            avatar: string;
            rank: string;
            level: number;
        }, unknown> & {};
        owner: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            token: string;
            state: number;
            connection_status: number;
            tfa_code: string;
            email: string;
            nickname: string;
            avatar: string;
            rank: string;
            level: number;
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        logo: string;
        private: boolean;
        directMsg: boolean;
        interlocutor_id: number;
        interlocutor_avatar: string;
        interlocutor_name: string;
        AdminList: number[];
    }, unknown> & {})>;
    findOne(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        logo: string;
        private: boolean;
        directMsg: boolean;
        interlocutor_id: number;
        interlocutor_avatar: string;
        interlocutor_name: string;
        AdminList: number[];
    }, unknown> & {}>;
    update(id: number, data: UpdateChanelInput): Promise<Chanel>;
    remove(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        logo: string;
        private: boolean;
        directMsg: boolean;
        interlocutor_id: number;
        interlocutor_avatar: string;
        interlocutor_name: string;
        AdminList: number[];
    }, unknown> & {}>;
    getOwnChanels(user_id: number): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        logo: string;
        private: boolean;
        directMsg: boolean;
        interlocutor_id: number;
        interlocutor_avatar: string;
        interlocutor_name: string;
        AdminList: number[];
    }, unknown> & {})[]>;
    getChannelByOwnersAndInterlocutor(userId1: number, userId2: number): Promise<Chanel | null>;
    removeDirectMsg(userId1: number, userId2: number): Promise<Chanel | null>;
}
