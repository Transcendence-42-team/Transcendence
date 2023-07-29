import React, { useEffect, useState } from "react";
import {  useQuery } from "@apollo/client";
import { IPropsChanel } from "../../interfaces/interfaces";
import { UserChanels } from "../../interfaces/interfaces";
import QuiteChanel from "./QuitChanel";
import { CHANELS_LIST } from '../graphql/QueryChanel'
import Direct_message from "./direct-message";

export default function ChanelList({refetchChanels, handleChanelRefetch, user, handleChange}: IPropsChanel) {

	const {data, loading, refetch, error} = useQuery(CHANELS_LIST, {
		variables: {
			input: user.id
		}
	})

	const [showDirectMessage, setShowDirectMessage] = useState(false);

	useEffect(() => {
		refetch();
	}, [refetchChanels, refetch])

	if (loading)
		return (<div>Loading</div>)

	if (error)
		return (<div>An Error as occured her</div>)

	if (!data)
		return (<div>nothing to see her</div>)

	// if (data)
	// 	console.log(data);

	return (

		<div id="plist" className="people-list">
			<h3>My Chanels</h3>{
				data.myChanels.map((chanel: UserChanels, index: number) => {
					const unique_key = `${chanel.user_id}-${chanel.chanels.id}`;
					return (<ul className="list-unstyled chat-list mt-2 mb-0" key={unique_key}>
					<li >
						<div><b>{chanel.chanels.chanel_name}</b></div>
						<button onClick={() => handleChange(chanel.chanels)}>her</button>
						<QuiteChanel
							label="Quite"
							element={chanel}
							handleChanelRefecth={handleChanelRefetch}
							/>
					</li>

				</ul>);
			})
		}
		<div className="list-unstyled chat-list mt-2 mb-0">
			{showDirectMessage ? (
			<Direct_message
			refetchChanels={refetchChanels}
			handleChanelRefetch={handleChanelRefetch}
			user={user}
			handleChange={handleChange}
			/> 
			) : (<button onClick={() => setShowDirectMessage(true)}>direct message</button>)
				 
			}
		</div>
		{/* <button onClick={() => handleChange(chanel.chanels)}>direct message</button> */}
		</div>
	)
}