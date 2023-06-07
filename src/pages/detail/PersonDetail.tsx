import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useParams } from "react-router-dom";
import { getPerson as getPersonById } from "../../services/StarWarsAPI";
import { Character } from "../../types";

const PersonDetail = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState<Character | null>(null);
  const { id } = useParams();
  const personId = Number(id);

  // Get person from API
  const fetchPerson = async (id: number) => {
    setError(null);
    setLoading(true);

    try {
      const data = await getPersonById(id);

      // Update person state with data
      setPerson(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (typeof personId !== "number") {
      return;
    }

    fetchPerson(personId);
  }, [personId]);

  if (error) {
    return (
      <Alert variant="warning">
        <h1>Something went wrong!</h1>
        <p>{error}</p>
        <Button variant="primary" onClick={() => fetchPerson(personId)}>
          TRY AGAIN!!!
        </Button>
      </Alert>
    );
  }

  if (loading || !person) {
    return <p>Loading...</p>;
  }

  return (
    <div className="col mb-4" key={person.id}>
      <Card border="primary" style={{ width: "80%" }}>
        <Card.Header className="card-header">{person.name}</Card.Header>
        <Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item key="eye color">
              Eye Color: {person.eye_color}
            </ListGroup.Item>
            <ListGroup.Item key="hair color">
              Hair Color: {person.hair_color}
            </ListGroup.Item>
            <ListGroup.Item key="height">
              Height: {person.height} cm
            </ListGroup.Item>
            <ListGroup.Item key="weight">
              Weight: {person.mass} kg
            </ListGroup.Item>
            <ListGroup.Item key="skin color">
              Skin Color: {person.skin_color}
            </ListGroup.Item>
            <ListGroup.Item key="species">
              Species:
              <ul>
                {person.species?.map((species) => (
                  <li key={species.id}>{species.name}</li>
                ))}
              </ul>
            </ListGroup.Item>
            <ListGroup.Item key="films">
              Films:
              <ul>
                {person.films?.map((film) => (
                  <li key={film.id}>
                    <Link to={`/films/${film.id}`}>{film.title}</Link>
                  </li>
                ))}
              </ul>
            </ListGroup.Item>
          </ListGroup>
          <Link to={`/search-people`}>
            <Button variant="primary">Back to People</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PersonDetail;
