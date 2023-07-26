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
    try{

      let chanelRes = await this.prisma.chanel.create({
        data: createChanelInput,
      })

      let user_chanel = await this.prisma.users_Chanels.create({
        data: {
          chanel_id: chanelRes.id,
          user_id: chanelRes.owner_id,
          pending: false
        }
      })
      
      return chanelRes;
    }
    catch (e){
      return new Error("Error during chanel creation: " +  e);
    }
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
  
  async remove(id: number) {
    return this.prisma.chanel.delete({where: {id: id}});
  }

  async getOwnChanels(user_id: number) {
    return this.prisma.chanel.findMany({where: {owner_id: user_id}});
  }

}
