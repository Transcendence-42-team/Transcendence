import React from "react";
import {useEffect, useState, useContext} from 'react';
import { useQuery } from '@apollo/client';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import CreateMsg from './createMessage'
import {Link} from 'react-router-dom';
import { GET_MESSAGES_BY_CHANNEL } from "../graphql/Query";
import { NewMessageSubscription } from "../graphql/souscription.ws";

const wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {});


type Message = {
	id: number;
	sender_id: number;
	content: string;
};

type channelfocus = {
	id: string,
	chanel_name: string,
	chanel_size: string,
	max_users: string,
	logo: string,
}

interface ChatBoxProps{
	chan:channelfocus
}

const ChatBox: React.FC<ChatBoxProps> = ({ chan }: { chan: channelfocus }) => {
	const { loading, error, data, refetch } = useQuery(GET_MESSAGES_BY_CHANNEL,{variables: {channelId: +chan.id}});
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		if (data && data.Message_findAll_msg_chan) {
			refetch();
			setMessages(data.Message_findAll_msg_chan);
		}
	}, [data]);

	useEffect(() => {
		const subscription = wsClient.request({query: NewMessageSubscription, variables: { input: +chan.id }}).subscribe({
			next(response) {
				// Next est une fonction de suscribe qui s'execute a chaque nouvelle creation de message 
				// reponse c'est la ou les reponse de notre server est stocker.
				if (response.data) {
					const newMessage = response.data.addmessage;
					setMessages(prevMessages => [...prevMessages, newMessage] as Message[]); // On copie les messages precedent et on rajoute newMessage
				}
			},
			error(error) {
				console.error('WebSocket error:', error);
			},
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [chan.id]);

	return (

		<div>
			{messages.map(message => (
					<div key={message.id}> {message.content}</div>
				))}
		</div>
	)
};

export default ChatBox;
