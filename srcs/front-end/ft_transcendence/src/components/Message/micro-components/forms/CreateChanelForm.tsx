import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_CHANEL } from '../../graphql/Mutation'
import { ICreateChanelFormProps } from '../../../interfaces/interfaces'


export default function CreateChanelForm({user, handleChanelRefetch}: ICreateChanelFormProps) {

	/* //////////////////////////////////////////////////////// */
	/* States */

	const [createChanel] = useMutation(CREATE_CHANEL);

	const [chanel, setChanel] = useState({
		chanel_name: "",
		chanel_size: "",
		max_users: "",
		logo: "",
		private: true
	});

	/* //////////////////////////////////////////////////////// */
	/* Handlers */

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		createChanel({variables: {
			input: {
				owner_id: user.id, 
				chanel_name: chanel.chanel_name,
				chanel_size: parseInt(chanel.chanel_size),
				max_users: parseInt(chanel.max_users),
				logo: chanel.logo,
				private: chanel.private
			}
		}}).then(() => {
			handleChanelRefetch();
		}).catch((error) => {
			console.log("Html: ", error.networkError.result);
		})
	}
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChanel({...chanel, [event.target.name]: event?.target.value
		})
	}

	const handleSelect = (e: any) => {
		if (e.target.value == "true")
			setChanel({...chanel, private: true});
		else
			setChanel({...chanel, private: false});
		// console.log(e);
	}

	/* //////////////////////////////////////////////////////// */
	/* JSX.Element return */

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
				<label htmlFor="chanel_size">
				chanel_size
				</label>
				<input
					type="text"
					name="chanel_size"
					value={chanel.chanel_size}
					placeholder="type her..."
					onChange={handleChange}
				/><br/>
				<label htmlFor="max_users">
				max_users
				</label>
				<input
					type="text"
					name="max_users"
					value={chanel.max_users}
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
				<label htmlFor="private">
					private
				</label>
					<label htmlFor="">| yes</label><input type="radio" onClick={handleSelect} value={"true"} name="private"/>
				<label htmlFor="public">
				</label>No
					<input type="radio" onClick={handleSelect} value={"false"} name="private"/>
				<br />
				{/* need to add a toggle btn her */}
				<button>Create +</button>
			</form>
		</div>
	)

}