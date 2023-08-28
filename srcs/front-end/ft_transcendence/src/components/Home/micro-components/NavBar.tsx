import { Link } from "react-router-dom"


export default function NavBar() {

	const handleLogOut = () => {
		sessionStorage.removeItem('user');
		window.location.reload();
	}
	
	return (
		
		<div id="nav-bar">
			<Link to ='/lp'>
				<button className='log-out-button logo-box' onClick={handleLogOut}></button>
			</Link>
			<Link to="/">
				<button className='home-button logo-box'></button>
			</Link>
			<Link to="/leaderBoard">
				<button className='leader-board-button logo-box'></button>
			</Link>
			<Link to="/message">
				<button className='message-button logo-box'></button>
			</Link>
			<Link to="/contact">
				<button className='contact-button logo-box'></button>
			</Link>
		</div>
	)
}