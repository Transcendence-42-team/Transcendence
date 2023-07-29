import React from "react";

type channelfocus = {
	id: string,
	chanel_name: string,
	chanel_size: string,
	max_users: string,
	logo: string,
}

interface ChatBoxProps{
	chan:channelfocus
}

const HeaderChanel: React.FC<ChatBoxProps> = ({ chan }: { chan: channelfocus }) => {

	return (
		<div className="chat-header">
			<div className="row">
				<div className="col-lg-6">
				<a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
					<img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />{/**afficher avatar */}
				</a>
				{/* ici on affichera un point vers si le user est connecter ou sinon vert si il est connecter*/ }
				<div className="chat-about">
					<h6 className="m-b-0"> {chan.chanel_name} </h6>
					<small>Last seen: 2 hours ago</small>
				</div>
				</div>

			</div>
		</div>
	);
}

export default HeaderChanel;