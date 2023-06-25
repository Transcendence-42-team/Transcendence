import { Resolver, Query, Mutation, Args, Int, Context} from '@nestjs/graphql';
import { ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return  this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'findAllUsers' })
  findAll(@Context() context: any) {

    const {token} = context;
    if (!token || !this.usersService.findUserByToken(token)) {
      throw new ForbiddenException('Invalid token');
    }
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'findOneUserById' })
  findOneUserById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findUserById(id);
  }


  @Query(() => User, { name: 'findOneUserByIntraLogin' })
  findOneUserByIntraLogin(@Args('intra_login', { type: () => String }) intra_login: string) {
    return this.usersService.findUserByIntraLogin(intra_login);
  }


  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

}