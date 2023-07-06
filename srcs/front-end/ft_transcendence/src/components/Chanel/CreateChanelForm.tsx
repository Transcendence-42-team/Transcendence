import React from "react";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_CHANEL } from './graphql/MutationsChanel'

export default function CreateChanelForm() {

	const [createChanel] = useMutation(CREATE_CHANEL);
	const userId = JSON.parse(sessionStorage.getItem('user') || '')?.id;

	const [chanel, setChanel] = useState({
		chanel_name: "",
		logo: ""
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		createChanel({variables: {
			input: {
				owner_id: userId,
				chanel_name: chanel.chanel_name,
				chanel_size: 10,
				max_users: 10,
				logo: chanel.logo
			}
		}}).catch((error) => {
			console.log("Html: ", error.networkError.result);
		})
	}
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChanel({...chanel, [event.target.name]: event?.target.value
		})
	}


	return (
		<div>
			<h3>Create Chanel Form</h3>
			<form action="submit" onSubmit={handleSubmit}>
	


				<label htmlFor="chanel_name">
				chanel_name
				</label>
				<input
					type="text"
					name="chanel_name"
					value={chanel.chanel_name}
					placeholder="type her..."
					onChange={handleChange}
				/><br/>



				<label htmlFor="logo">
				logo
				</label>
				<input
					type="text"
					name="logo"
					value={chanel.logo}
					placeholder="type her..."
					onChange={handleChange}
				/><br/>
				<button>Create +</button>
			</form>
		</div>
	)

}