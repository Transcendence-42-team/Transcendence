import { Injectable } from '@nestjs/common';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { PrismaService } from 'prisma/prisma.service';
import { Chanel } from './entities/chanel.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChanelService {
	constructor(private readonly prisma: PrismaService,
              private readonly user: UsersService) {}

  async create(createChanelInput: CreateChanelInput) {
    return this.prisma.chanel.create({
      data: createChanelInput
	  })
  }

  async findOne(id: number) {
    return this.prisma.chanel.findUnique({where: {id: id}});
  }

  async update(id: number, data: UpdateChanelInput): Promise<Chanel> {
    return this.prisma.chanel.update({
      where: { id },
      data,
    });
  }



async getChannelByOwnersAndInterlocutor(userId1: number, userId2: number): Promise<Chanel | null> {
    return this.prisma.chanel.findFirst({
      where: {
        OR: [
          {
            owner_id: userId1,
            interlocutor_id: userId2,
          },
          {
            owner_id: userId2,
            interlocutor_id: userId1,
          },
        ],
      },
    });
  }



  async remove(id: number) {
    return this.prisma.chanel.delete({where: {id: id}});
  }

  async getOwnChanels(user_id: number) {
    return this.prisma.chanel.findMany({where: {owner_id: user_id}});
  }

}
