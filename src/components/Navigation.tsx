import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'

const Navigation = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">Star Wars Encyclopedia </Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/search-films">Films</Nav.Link>
						<Nav.Link as={NavLink} end to="/search-people">People</Nav.Link>
						<Nav.Link as={NavLink} end to="/search-species">Species</Nav.Link>
						<Nav.Link as={NavLink} end to="/search-planets">Planets</Nav.Link>
						<Nav.Link as={NavLink} end to="/search-starships">Starships</Nav.Link>
						<Nav.Link as={NavLink} end to="/search-vehicles">Vehicles</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
