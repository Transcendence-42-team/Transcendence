import { Resolver, Query, Args, Int, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { UsersChanels } from './entities/user_chanel.entity';
import { ChanelService } from 'src/chanel/chanel.service';
import { UserChanelsService } from './user-chanels.service';
import { AddUserChanel } from './dto/add-user-chanel.input';
import { Chanel } from 'src/chanel/entities/chanel.entity';
import {  UpdateChanelUserInput } from './dto/update-chanel-user.input';

@Resolver(() => UsersChanels)
export class UserChanelsResolver {

	constructor(private readonly chanelService: ChanelService,
				private readonly userChanelService: UserChanelsService) {}

	@Mutation(() => UsersChanels)
	addUser(@Args('addUserChanel') addUserChanel: AddUserChanel) {
		return this.userChanelService.addUser(addUserChanel);
	}
	
	@ResolveField(() => Chanel, {name: "chanels"})
	ChanelsOwner(@Parent() chanel: UsersChanels) {
		return this.chanelService.findOne(chanel.chanel_id);
	}
	
	@Mutation(() => UsersChanels, {name: "acceptRequest"})
	acceptRequest(@Args("key") Requestkey: UpdateChanelUserInput) {
		return this.userChanelService.acceptRequest(Requestkey);
	}
	
	@Query(() => [UsersChanels], {name: "chanelsRequest"})
	chanelRequest(@Args("user_id", {type: () => Int}) user_id: number) {
		return this.userChanelService.findMyRequestChanels(user_id);
	}

	@Query(() => [UsersChanels], { name: 'myChanels' })
	findMyChanels(@Args("user_id", {type: () => Int}) user_id: number) {
	  return this.userChanelService.findMyChanels(user_id);
	}

	@Mutation(() => UsersChanels, {name: "deleteChanelUser"})
	deleteChanelUser(@Args("key") key: UpdateChanelUserInput) {
		return this.userChanelService.delete(key);
	}
}
