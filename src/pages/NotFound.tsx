import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import error from '../assets/images/error.png'
import { Image } from 'react-bootstrap';


const NotFound = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
		<h1>Sorry, that page could not be found 😢!</h1>
		<Image src={error} fluid />
		<Link to="/">
			<Button variant="primary">Screw you guys, I'm going home</Button>
		</Link>
		</div>
	)
}

export default NotFound
