import { IHeaderProps } from '../../../interfaces/interfaces'
import { __ADD_USER__ } from "../../message";
import { __CHAN_PARAM__ } from "../../message";


export default function HeaderChanel({chanel_focus, user, is_chanel, handleChatBox}: IHeaderProps) {

	const handelClick = () => {
		console.log("dev log | in add user in chanel ");
		handleChatBox(__ADD_USER__);
	}
	
	const handleChanParam = () => {
		console.log("param of channel");
		handleChatBox(__CHAN_PARAM__);
	}


	return (
		<div className="chat-header">
			<div className="row">
				<div className="col-lg-6">
				{/* <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info"> */}
					<img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />{/**afficher avatar */}
				{/* </a> */}
				{/* ici on affichera un point vers si le user est connecter ou sinon vert si il est connecter*/ }
				<div className="chat-about">
					<h6 className="m-b-0"> {chanel_focus.chanel_name} </h6>
					<small>Last seen: 2 hours ago</small>
				</div>
				<div>{chanel_focus.id !== "" ? <button onClick={handelClick}>++</button> : null}</div> {/* btn pour l'ajout de users dans un chanel */}
				</div>
				<div>
					<button onClick={handleChanParam}> parametre </button>
				</div>
			</div>
		</div>
	);
}