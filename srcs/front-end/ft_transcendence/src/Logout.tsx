import { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_STATE } from "./components/Authentication/graphql/Mutation";
import { WebSocketContext } from "./WebSocketProvider";


const __CONNECTED_ = 1;
const __AFK__ = 2;
const __DISCONECTED__ = 3;


export default function Logout() {
	const [updateState] = useMutation(UPDATE_STATE)
	const [state, setState] = useState(__DISCONECTED__);
	const wsContext = useContext(WebSocketContext);

		if (wsContext?.wsClient) {
			updateState({
				variables: {
					state: __DISCONECTED__
				}
			})
		}

	return (
		<div>
			
		</div>
	)
}