import React from "react";
import { useMutation } from "@apollo/client";
import { IRequest } from '../../../interfaces/interfaces'
import { QUITE_CHANEL } from '../../graphql/Mutation'

export default function QuiteChanel({handleChanelRefetch,  element, label}: IRequest) {

	
	const [delContact] = useMutation(QUITE_CHANEL);

	const handleClic =  () => {
		delContact({
			variables: {
				input: {
					chanel_id: element.chanels.id
				}
			}
		}).then(() => {
			handleChanelRefetch();
		})
		.catch((error) => {
			console.log("Graphql error: ", error);
			console.log("HTML error: ", error.networkError.result);
		});
	};

	return (
		<button onClick={handleClic} >{label}</button>
	)
}