import { ObjectType, Field, Int} from '@nestjs/graphql';

@ObjectType()
export class Pong {
	@Field(() => Int)
	id: number;

	@Field(() => Int)
	userId1: number;

  	@Field(() => Int)
	userId2: number;

  	@Field(() => Int)
	scoreUser1: number;

  	@Field(() => Int)
	scoreUser2: number;

  	@Field(() => Int)
	loser_id: number;

  	@Field(() => Int)
	winner_id: number;

	@Field(() => Date)
	versusDate: Date;
}



