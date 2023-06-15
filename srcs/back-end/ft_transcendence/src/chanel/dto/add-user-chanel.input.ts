import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AddUserChanel {
	@Field(() => Int)
	user_id: number;

	@Field(() => Int)
	chanel_id: number;

	@Field(() => Boolean)
	pending: boolean;
}