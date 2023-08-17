import { PrismaService } from 'prisma/prisma.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
export declare const __CONNECTED__ = 1;
export declare const __AFK__ = 2;
export declare const __DISCONNECTED__ = 3;
export declare class AuthenticationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserInput: CreateUserInput): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        token: string;
        state: number;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
        rank: string;
        level: number;
    }, unknown> & {}>;
    findUserByIntraLogin(intra_login: string): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        token: string;
        state: number;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
        rank: string;
        level: number;
    }, unknown> & {}>;
}