import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  token: string;

  @Field(() => Boolean)
  is_connecting: boolean;
 
  @Field({ nullable: true })
  tfa_code?: string;

  @Field()
  email: string;

  @Field()
  intra_login: string;

  @Field()
  nickname: string;

  @Field({ nullable: true })
  avatar?: string;
}
