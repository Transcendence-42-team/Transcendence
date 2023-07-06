import React from "react";
import { useState } from "react";
import UserChanelsRequests from "./ChanelsRequests";
import CreateChanelForm from "./CreateChanelForm";
import ChanelList from "./ListChanel";
import './css/Chanel.css';
const Chanel = ({show}: {show: boolean}) => {
	
	const [refetchChanels, setRefecthChanel] = useState(false);

	const handleChanelRefetch = () => {
		setRefecthChanel(prev => !prev);
	}

	return (
		<div className={`Chanel_pad ${show ? 'Chanel_show' : ''}`}>
			<React.Fragment>
				<CreateChanelForm />
				<UserChanelsRequests 
					refetchChanels={refetchChanels}
					handleChanelRefetch={handleChanelRefetch}
				 />
				 <ChanelList 
				 	refetchChanels={refetchChanels}
					handleChanelRefetch={handleChanelRefetch}
				 />
			</React.Fragment>
		</div>
	)
}

export default Chanel;