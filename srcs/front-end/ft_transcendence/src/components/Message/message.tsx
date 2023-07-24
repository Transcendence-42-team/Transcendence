import {useState} from 'react';
import CreateMsg from './micro-components/createMessage'
import './css/messages.css';
import {Link} from 'react-router-dom';
import ChatBox from './micro-components/ChatBox';
import { Chanel } from '../interfaces/interfaces';
import ListChanel from './micro-components/ListChanel';
import HeaderChanel from './micro-components/HeaderChanel';


const Message = () => {

	const user = JSON.parse(sessionStorage.getItem('user') || '');

	const [chanel_focus, setChanelFocus] = useState({
		id: "",
		chanel_name: "",
		chanel_size: "",
		max_users: "",
		logo: "",
	});

	const [refetchChat, setRefetchChat] = useState(false);

	const handleChange = (element: Chanel) => {

		setChanelFocus({
			id: element.id.toString(),
			chanel_name: element.chanel_name,
			chanel_size: element.chanel_size.toString(),
			max_users: element.max_users.toString(),
			logo: element.logo
		});
	}



	const handleRefetch = () => {
		setRefetchChat(prevValue => !prevValue);
	}

	  return (

		<div className="container">
        <Link to="/">
          <button className='home-button logo-box'></button>
        </Link>

		  <div className="row clearfix">
			<div className="col-lg-12">
			  <div className="screen-box chat-app">
				<ListChanel 
					refetchChanels={refetchChat}
					handleChanelRefetch={handleRefetch}
					user={user}
					handleChange={handleChange}
				/>
				<div className="chat"> 
				  <HeaderChanel />
				  <div className="chat-history">
					<ChatBox chan={chanel_focus} />
				  </div>

				  <div className="chat-message ">
					<div className="input-group mb-0">
						<CreateMsg chan={chanel_focus} />
					</div>
				  </div>
				</div>
			  </div>
			 </div> 
		  </div>
		</div>
	  );
};

export default Message;