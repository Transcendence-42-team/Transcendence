import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  
  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: createUserInput
    })
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOneUserById(id: number) {
    return this.prisma.user.findUnique({where: {id}});
  }

  findOneUserByIntraLogin(intra_login: string) {
    return this.prisma.user.findUnique({where: {intra_login}});
  }

  update(id: number, data: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id },
      data
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({where: {id: id}});
  }

}