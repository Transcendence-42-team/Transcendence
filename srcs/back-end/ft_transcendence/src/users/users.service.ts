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

      //lors de la creation du User nous mettons a jour le token
      // et un bouleen servant a la verification de la connexion du user
      const token = generateAccessToken(user.id);
      const is_connecting = false;
      await this.prisma.user.update({
        where: { id: user.id },
        data: { token, is_connecting }
      });

      // Récupérez l'utilisateur mis à jour avec le jeton d'accès
      const updatedUser = await this.prisma.user.findUnique({
        where: { id: user.id }
      });

      // Retournez l'utilisateur mis à jour 
      return updatedUser;
    } 
    catch (error) {
      throw new Error("Échec de la création de l'utilisateur.");
    }
  }
  
  
  findAll() {
    return this.prisma.user.findMany({});
  }

  findUserById(id: number) {
    return this.prisma.user.findUnique({where: {id}});
  }

    findUserByToken(token: string) {
    return this.prisma.user.findUnique({where: {token}});
  }

  async findUserByIntraLogin(intra_login: string) {
    const user = await this.prisma.user.findUnique({ where: { intra_login } });

    // Cette verification permet de savoir si cette query est lancé a l'authentification 
    if (user && user.is_connecting) {
      const token = generateAccessToken(user.id);
      const is_connecting = false;
      await this.prisma.user.update({
        where: { id: user.id },
        data: { token, is_connecting },
      });
    }
    return user;
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