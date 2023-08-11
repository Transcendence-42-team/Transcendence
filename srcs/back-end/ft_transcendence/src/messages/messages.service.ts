import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMessageInput } from './dto/create-messages.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/messages.entity';
import { UserChanelsService } from 'src/user-chanels/user-chanels.service';

@Injectable()
export class MessagesService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll_msg() { 
		return this.prisma.message.findMany({});
	}

	async findOne_msg(id: number) {
		return this.prisma.message.findUnique({where: {id: id}});
	}

	async findAll_msg_chan(channelId: number) {
		return this.prisma.message.findMany({
			where: {
				//il faudra peut etre que on rajoute un filtre pour ne pas retourner les message des personne bloquer par ce user
				channel_id: channelId // Utilisation de la variable channelId pour filtrer les messages
			}
		});
	}

	create(createMsg: CreateMessageInput) {
		return this.prisma.message.create({ data: createMsg });
	}

	update(id: number, updateMsg: UpdateMessageInput) {
		return this.prisma.message.update({ 
			where: {id: id},
			data: updateMsg,
		 });
	}

	delete(id: number) {
		return this.prisma.message.delete({ where: { id: id } });
	}

	/*
	in this service i check if the user who want write in this channel has been muted
	if he is muted, i check make a substraction of the current time and the time when he has been muted.
	if the difference of the time is > 5 the user stay muted 
	and if the time is <= 5, that mean the time of the mute has been reached si i unmuted him,
	*/
	async isUserMutedInChannel(userId: number, channelId: number): Promise<boolean>{
		const userChannel = await this.prisma.users_Chanels.findFirst({
		  where: {
			user_id: userId,
			chanel_id: channelId,
			pending: false, // Vérifier si l'utilisateur est approuvé dans le canal
		  },
		});
		if(userChannel?.is_muted === true){
			const time = Math.floor(new Date().getTime() / 60000); // i convert the miliseconds to minutes
			if( (time - userChannel.mute_start_time) > 5 ){
				await this.prisma.users_Chanels.update({
					where: {
					  user_id_chanel_id: {
						  user_id: userChannel.user_id,
						  chanel_id: userChannel.chanel_id,
					  },
				  },
					data: {
					  pending: false,
					  is_muted: false,
					  is_admin: userChannel.is_admin,
					  mute_start_time: 0,
					},
				  });
				  return false;
			}
			return true;
		}
		else{
			return false;
		} // Vérifier si l'utilisateur est en mode "muted"
	}
}
