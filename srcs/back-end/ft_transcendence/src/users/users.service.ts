import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'prisma/prisma.service';
import { generateAccessToken } from 'src/utils/auth.utils';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createUserInput: CreateUserInput) {
    try {
      const user = await this.prisma.user.create({
        data: createUserInput
      });
  
      await this.update(user.id, { id: user.id, token: generateAccessToken(user.id) });
  
      // Récupérer les données mises à jour de l'utilisateur
      const updatedUser = await this.prisma.user.findUnique({
        where: { id: user.id }
      });
      if (!updatedUser) {
        throw new Error("Impossible de récupérer l'utilisateur mis à jour.");
      }
      return updatedUser;
    } 
    catch (error) {
      throw new Error("Échec de la création de l'utilisateu");
    }
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