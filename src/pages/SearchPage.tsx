import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import * as StarWarsAPI from '../services/StarWarsAPI'
import {Film} from '../types'


const SearchFilm = () => {
	const [searchInput, setSearchInput] = useState("")
	const [films, setFilms] = useState<Film[]>([])

	const handleSubmit = async (e:React.FormEvent) =>{
		e.preventDefault()
	
		const data = await StarWarsAPI.getFilm(searchInput)

		setFilms(data)
	}

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setSearchInput(e.target.value)}
						placeholder="Enter your search query"
						required
						type="text"
						value={searchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						variant="success"
						type="submit"
						disabled={!searchInput.trim().length}
					>Search</Button>
				</div>
			</Form>

			{/* {films == undefined && <p>🤔 Loading...</p>} */}

			{films && films.length > 0 && (
				<div id="search-result">
					<p>Showing HITS search results for QUERY...</p>

					<ListGroup className="mb-3">
						{films.map(film => (
							<ListGroup.Item
								action
								href={''}
								key={''}
							>
								<h2 className="h3">{film.title}</h2>
								<p className="text-muted small mb-0">POINTS points by AUTHOR at CREATED_AT</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					<div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button
								variant="primary"
							>Previous Page</Button>
						</div>

						<div className="page">PAGE</div>

						<div className="next">
							<Button
								variant="primary"
							>Next Page</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default SearchFilm
