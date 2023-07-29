import { GET_CHAN_BY_OWNER_AND_INTERLOCUTOR } from '../graphql/Query';
import { IContact } from "../../interfaces/interfaces";
import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { CREATE_CHANEL } from '../graphql/MutationsChanel';
import MyComponent from './creat_user_chan';
import { Chanel } from '../../interfaces/interfaces';

const Creat_direct_msg = ({interlocutor}: {interlocutor: IContact}) => {

	const user = JSON.parse(sessionStorage.getItem('user') || '');
	const [hasFetchedData, setHasFetchedData] = useState<Chanel>(); // Nouvelle variable d'état

	const { data, loading, error } = useQuery(GET_CHAN_BY_OWNER_AND_INTERLOCUTOR, {
		variables: {
		  userId1: user.id,
		  userId2: interlocutor.id,
		},
	});
	
	const [createChannel] = useMutation(CREATE_CHANEL);
	
	
	// const channel = data?.getChannelByOwnersAndInterlocutor;
	useEffect(() => {

		if (loading) {
			  // La requête n'est pas encore terminée, ne rien faire
			  return;
		}

		if (!data) {
			// console.log('weeeeeee ==>>  ', hasFetchedData);
			createChannel({
			variables: {
			  input: {
				owner_id: parseInt(user.id, 10),
				chanel_name: user.nickname,
				chanel_size: 2,
				max_users: 2,
				interlocutor_id: interlocutor.id,
				logo: 'test10',
				// directMsg: false,
			  }
			}
		  }).then((response) => {
			const responseData = response.data; // Les données renvoyées par la mutation
			// console.log('Réponse de la mutation :', responseData);
			// console.log('Type de responseData :', typeof responseData);

			setHasFetchedData(responseData.createChanel);}).catch((error) => {
			console.log("Html: ", error.networkError.result);
		  });
		}
	  }, [loading]);
	
	// if (loading) {
	//   return <div>Loading...</div>;
	// }

	if (!data && hasFetchedData) {
		
		// console.log('dans le creat ===>>>  ', hasFetchedData?.id)
	  return (
		<div>
      		{<MyComponent chan={data} hasFetchedData={hasFetchedData} />}
			les nvx channel sont sensé etre cree
		</div>
	  );
	}

	return(
		<div>
      		{/* {<MyComponent chan={data}/>} */}
			wee
		</div>

	)
	
}

export default  Creat_direct_msg;