import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useParams } from "react-router-dom";
import { getFilm as getFilmById } from "../../services/StarWarsAPI";
import { Film, Character } from "../../types";

const FilmDetail = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [film, setFilm] = useState<Film | null>(null);
  const { id } = useParams();
  const filmId = Number(id);

  // Get film from API
  const fetchFilm = async (id: number) => {
    setError(null);
    setLoading(true);

    try {
      // call StarWarsAPI
      const data = await getFilmById(id);

      // update film state with data
      setFilm(data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // set error
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (typeof filmId !== "number") {
      return;
    }

    fetchFilm(filmId);
  }, [filmId]);

  if (error) {
    return (
      <Alert variant="warning">
        <h1>Something went wrong!</h1>
        <p>{error}</p>

        <Button variant="primary" onClick={() => fetchFilm(filmId)}>
          TRY AGAIN!!!
        </Button>
      </Alert>
    );
  }

  if (loading || !film) {
    return <p>Loading...</p>;
  }

  return (
    <div className="col mb-4" key={film.id}>
      <Card border="primary" style={{ width: "80%" }}>
        <Card.Header className="card-header">
          <h3>{film.title}</h3>
        </Card.Header>
        <Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item key="episode">
              Director {film.director}
            </ListGroup.Item>
            <ListGroup.Item key="episode">
              Synopsis: <br></br>
              <br></br>
              {film.opening_crawl}
            </ListGroup.Item>
            <ListGroup.Item key="release_date">
              Release Date {film.release_date}
            </ListGroup.Item>
            <ListGroup.Item key="characters">
              Characters:
              <ul>
                {film.characters?.map((character: Character) => (
                  <li key={character.id}>
                    <Link to={`/people/${character.id}`}>{character.name}</Link>
                  </li>
                ))}
              </ul>
            </ListGroup.Item>
          </ListGroup>
          <Link to={`/search-films`}>
            <Button variant="primary">Back to Films</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FilmDetail;
