import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChanelInput {
  @Field(() => Int, {nullable: true})
  owner_id: number;
  
  @Field(() => String, {nullable: true})
  chanel_name: string;

  @Field(() => Int, {nullable: true})
  chanel_size: number;

  @Field(() => Boolean, {nullable: true})
  privmsg?: boolean;

  @Field(() => Int, {nullable: true})
  max_users: number;

  @Field(() => String, {nullable: true})
  logo: string;

  @Field(() => Int, {nullable: true})
  interlocutor_id: number;
}