import { gql,useQuery, useMutation } from "@apollo/client";
import { GET_CONTACT } from "../graphql/Query";
// import React from 'react';
import { IContacts } from "../../interfaces/interfaces";
import { CREATE_CHANEL } from "../graphql/MutationsChanel";
import {useState} from 'react';
import Creat_direct_msg from "./Creat_direct_msg";

export default function Direct_message() {
	const user = JSON.parse(sessionStorage.getItem('user') || '');
	const [showQueryComponent, setShowQueryComponent] = useState(false);

	const {data, error, loading} = useQuery(GET_CONTACT, {
		variables: {user_id: +user.id}
	});
	// const [createChanel] = useMutation(CREATE_CHANEL);

	const handleNewDirectMsg = () => {
		setShowQueryComponent(true); // Affichez le composant MyComponentWithQuery lorsque le bouton est cliqué
	}

	// console.log('je test ici: ', data)

	if (!data || !data.myContacts) {
		return <p>No contacts available.</p>;
	}
	



	return(
		<div>
			{data.myContacts.map((contact: IContacts) => {
				const unique_key=`${contact.id}-${contact.contact.id}`;
				return (<ul className="list-unstyled chat-list mt-2 mb-0" key={unique_key}>
					<li > 
						<p>{contact.contact.nickname}</p>
						{showQueryComponent && < Creat_direct_msg interlocutor={contact.contact} />}
						<button onClick={handleNewDirectMsg}>Faire une nouvelle requête</button>
						
					</li>
				</ul>);

			})}
			  {/* Bouton pour afficher le composant MyComponentWithQuery */}
    
		</div>
	);
}
