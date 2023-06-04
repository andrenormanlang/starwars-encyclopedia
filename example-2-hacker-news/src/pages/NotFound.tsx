import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import error from '../assets/images/error.gif'
import { Image } from 'react-bootstrap';


const NotFound = () => {
	return (
		<>
			<h1>Sorry, that page could not be found 😢!</h1>

			<Link to="/">
				<Button variant="primary">Screw you guys, I'm going home</Button>
			</Link>

			<Image src={error} fluid />
		</>
	)
}

export default NotFound
