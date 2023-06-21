import { Injectable } from '@nestjs/common';
import { AddUserChanel } from './dto/add-user-chanel.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserChanelsService {

	constructor(private readonly prisma: PrismaService) {}

	async findMyChanels(user_id: number) { 
		return this.prisma.users_Chanels.findMany({ where: { user_id } });
	}

	async addUser(input: AddUserChanel) {
		return this.prisma.users_Chanels.create({
		data : {
		  user: { connect: { id: input.user_id } },
		  chanel: { connect: { id: input.chanel_id } }
		}
		})
	}
}
